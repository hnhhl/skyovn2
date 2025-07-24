"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { getLunarDayString, getLunarDateObject, getVietnameseMonthName, getVietnameseYear } from "@/lib/lunar-calendar"
import { getHolidayForDate, getLunarSpecialDate } from "@/lib/vietnamese-holidays"
import { getWeatherForAirport, getWeatherForecast, getWeatherForDate, getWeatherLoadingState, getCityName, type WeatherData, type WeatherForecast, type DailyWeather, type WeatherLoadingState } from "@/lib/weather-service"
import { WeatherHeaderSkeleton, WeatherLoadingProgress, WeatherIconSkeleton, DayWeatherPulse } from "@/components/ui/weather-loading"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  departureDate,
  isReturnCalendar = false,
  destination,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  departureDate?: Date
  isReturnCalendar?: boolean
  destination?: string
}) {
  const defaultClassNames = getDefaultClassNames()
  const [weather, setWeather] = React.useState<WeatherData | null>(null)
  const [weatherForecast, setWeatherForecast] = React.useState<WeatherForecast | null>(null)
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null)
  const [hoveredDateWeather, setHoveredDateWeather] = React.useState<DailyWeather | null>(null)
  const [weatherLoading, setWeatherLoading] = React.useState<WeatherLoadingState>({ isLoading: false, error: null, progress: 0 })
  const [isInitialLoad, setIsInitialLoad] = React.useState(true)

  // Fetch weather data for destination with loading states
  React.useEffect(() => {
    if (destination) {
      // Start loading
      setWeatherLoading({ isLoading: true, error: null, progress: 0 })
      setIsInitialLoad(true)

      const fetchWeather = async () => {
        try {
          // Fetch current weather
          const currentWeather = await getWeatherForAirport(destination)
          setWeather(currentWeather)

          // Fetch forecast
          const forecast = await getWeatherForecast(destination)
          setWeatherForecast(forecast)

          // Get final loading state
          const loadingState = getWeatherLoadingState(destination)
          setWeatherLoading(loadingState)
          setIsInitialLoad(false)
        } catch (error) {
          console.error('Error fetching weather:', error)
          setWeatherLoading({
            isLoading: false,
            error: 'Không thể tải thời tiết',
            progress: 0
          })
          setIsInitialLoad(false)
        }
      }

      fetchWeather()

      // Poll loading state during fetch
      const interval = setInterval(() => {
        const currentState = getWeatherLoadingState(destination)
        setWeatherLoading(currentState)

        if (!currentState.isLoading) {
          clearInterval(interval)
        }
      }, 200)

      return () => clearInterval(interval)
    }
  }, [destination])

  // Fetch weather for hovered date
  React.useEffect(() => {
    if (hoveredDate && destination) {
      getWeatherForDate(destination, hoveredDate).then(setHoveredDateWeather)
    } else {
      setHoveredDateWeather(null)
    }
  }, [hoveredDate, destination])



  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-6 [--cell-size:3.5rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent min-w-[400px]",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => getVietnameseMonthName(date),
        formatCaption: (date) => `${getVietnameseMonthName(date)} ${getVietnameseYear(date)}`,
        formatMonthCaption: (date) => `${getVietnameseMonthName(date)} ${date.getFullYear()}`,
        formatYearCaption: (date) => `Năm ${date.getFullYear()}`,
        formatWeekdayName: (date) => {
          const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
          return weekdays[date.getDay()];
        },
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit min-w-[400px]", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-6 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-6", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-2",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50 hover:bg-green-100 hover:text-green-700 hover:shadow-md transition-all duration-200 rounded-xl border border-green-200",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50 hover:bg-green-100 hover:text-green-700 hover:shadow-md transition-all duration-200 rounded-xl border border-green-200",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size] bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-100",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-2 text-lg font-bold text-green-700 bg-gradient-to-r from-green-50 to-blue-50",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-green-500 border-input shadow-xs has-focus:ring-green-500/50 has-focus:ring-[3px] relative rounded-lg border-2",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "bg-popover absolute inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-bold text-lg text-green-700",
          captionLayout === "label"
            ? "text-lg"
            : "[&>svg]:text-muted-foreground flex h-10 items-center gap-2 rounded-lg pl-3 pr-2 text-lg [&>svg]:size-4",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex mb-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg mx-2 py-1", defaultClassNames.weekdays),
        weekday: cn(
          "text-green-700 flex-1 select-none text-sm font-bold uppercase tracking-wide py-2 text-center",
          defaultClassNames.weekday
        ),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-muted-foreground select-none text-sm font-medium",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-1 text-center [&:first-child[data-selected=true]_button]:rounded-l-lg [&:last-child[data-selected=true]_button]:rounded-r-lg",
          defaultClassNames.day
        ),
        range_start: cn(
          "bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-l-lg shadow-lg",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none bg-gradient-to-r from-green-100 to-emerald-100 text-green-800", defaultClassNames.range_middle),
        range_end: cn("bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-r-lg shadow-lg", defaultClassNames.range_end),
        today: cn(
          "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-lg data-[selected=true]:rounded-none font-semibold border-2 border-blue-300 shadow-sm",
          defaultClassNames.today
        ),
        outside: cn(
          "text-gray-300 aria-selected:text-gray-400",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-gray-300 opacity-40",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, children, ...props }) => {
          return (
            <>
              {/* Weather Preview for Destination */}
              {destination && (
                <>
                  {/* Show loading skeleton during initial load */}
                  {isInitialLoad && weatherLoading.isLoading ? (
                    <div className="mb-2">
                      <WeatherHeaderSkeleton />
                      <WeatherLoadingProgress loading={weatherLoading} className="px-4 pb-2" />
                    </div>
                  ) : (
                    /* Show weather data when loaded */
                    (weather || hoveredDateWeather) && (
                      <div className="bg-gradient-to-r from-blue-50 to-green-50 border-b border-green-100 p-4 rounded-t-2xl mb-2 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{hoveredDateWeather?.icon || weather?.icon}</div>
                            <div>
                              <div className="font-semibold text-gray-800">
                                {getCityName(destination)}
                                {hoveredDate && (
                                  <span className="ml-2 text-sm font-normal text-blue-600">
                                    • {hoveredDate.toLocaleDateString('vi-VN')}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600">
                                {hoveredDateWeather?.description || weather?.description}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-800">
                              {hoveredDateWeather ? (
                                <span className="text-blue-600">
                                  {hoveredDateWeather.tempMin}° - {hoveredDateWeather.tempMax}°C
                                </span>
                              ) : (
                                <span>{weather?.temperature}°C</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              Độ ẩm {hoveredDateWeather?.humidity || weather?.humidity}% • Gió {hoveredDateWeather?.windSpeed || weather?.windSpeed}km/h
                            </div>
                            {hoveredDateWeather && (
                              <div className="text-xs text-blue-600 mt-1 animate-pulse">
                                📅 Dự báo ngày này
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {/* Show error state */}
                  {weatherLoading.error && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded-t-2xl mb-2">
                      <div className="flex items-center gap-2 text-red-600">
                        <span>⚠️</span>
                        <span className="text-sm">{weatherLoading.error}</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Calendar container */}
              <div
                data-slot="calendar"
                ref={rootRef}
                className={cn("rounded-2xl shadow-2xl border-2 border-gradient-to-r from-green-200 to-blue-200 bg-gradient-to-br from-white via-green-50/30 to-blue-50/30 backdrop-blur-sm overflow-hidden", className)}
                {...props}
              >
                {/* Enhanced border with gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 rounded-2xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-inner">
                  {children}
                </div>
              </div>
            </>
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-5 text-green-600", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-5 text-green-600", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-5 text-green-600", className)} {...props} />
          )
        },
        DayButton: (dayButtonProps) => (
          <CalendarDayButton
            {...dayButtonProps}
            departureDate={departureDate}
            isReturnCalendar={isReturnCalendar}
            onDateHover={setHoveredDate}
            weatherForecast={weatherForecast}
          />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center text-green-600 font-medium">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  departureDate,
  isReturnCalendar = false,
  onDateHover,
  weatherForecast,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  departureDate?: Date
  isReturnCalendar?: boolean
  onDateHover?: (date: Date | null) => void
  weatherForecast?: WeatherForecast | null
}) {
  const defaultClassNames = getDefaultClassNames()
  const lunarDay = getLunarDayString(day.date)
  const lunarDate = getLunarDateObject(day.date)

  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  // Check if this is the departure date
  const isDepartureDate = departureDate &&
    day.date.toDateString() === departureDate.toDateString()

  // Check for holidays and special dates
  const holiday = getHolidayForDate(day.date)
  const lunarSpecial = getLunarSpecialDate(lunarDate.month, lunarDate.day)
  const specialEvent = holiday || lunarSpecial

  // Get weather for this date
  const dateStr = day.date.toISOString().split('T')[0]
  const dayWeather = weatherForecast?.daily.find(d => d.date === dateStr)

  // Determine styling based on special events
  const isSpecialDay = !!specialEvent
  const isPublicHoliday = holiday?.isPublicHoliday
  const eventColor = specialEvent?.color || '#6b7280'

  // Handle hover events
  const handleMouseEnter = React.useCallback(() => {
    if (onDateHover && !modifiers.disabled) {
      onDateHover(day.date)
    }
  }, [onDateHover, day.date, modifiers.disabled])

  const handleMouseLeave = React.useCallback(() => {
    if (onDateHover) {
      onDateHover(null)
    }
  }, [onDateHover])

  return (
    <div className="relative">
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        data-day={day.date.toLocaleDateString()}
        data-selected-single={
          modifiers.selected &&
          !modifiers.range_start &&
          !modifiers.range_end &&
          !modifiers.range_middle
        }
        data-range-start={modifiers.range_start}
        data-range-end={modifiers.range_end}
        data-range-middle={modifiers.range_middle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "data-[selected-single=true]:bg-gradient-to-br data-[selected-single=true]:from-green-500 data-[selected-single=true]:to-emerald-600 data-[selected-single=true]:text-white data-[selected-single=true]:shadow-lg data-[range-middle=true]:bg-green-100 data-[range-middle=true]:text-green-800 data-[range-start=true]:bg-gradient-to-br data-[range-start=true]:from-green-500 data-[range-start=true]:to-emerald-600 data-[range-start=true]:text-white data-[range-start=true]:shadow-lg data-[range-end=true]:bg-gradient-to-br data-[range-end=true]:from-green-500 data-[range-end=true]:to-emerald-600 data-[range-end=true]:text-white data-[range-end=true]:shadow-lg group-data-[focused=true]/day:border-green-500 group-data-[focused=true]/day:ring-green-500/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-0.5 font-normal leading-none data-[range-end=true]:rounded-lg data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-lg group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] hover:bg-gradient-to-br hover:from-green-50 hover:to-blue-50 hover:text-green-700 hover:shadow-md transition-all duration-200 relative transform hover:scale-105",
          // Special styling for departure date in return calendar
          isDepartureDate && isReturnCalendar && "bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-400 text-blue-800 hover:from-blue-200 hover:to-cyan-200 ring-2 ring-blue-300 shadow-md",
          // Special styling for holidays and special dates
          isSpecialDay && !modifiers.selected && "ring-2 ring-opacity-50 shadow-sm",
          isPublicHoliday && !modifiers.selected && "bg-gradient-to-br from-red-50 to-pink-50 ring-red-300 text-red-800 shadow-sm",
          isSpecialDay && !isPublicHoliday && !modifiers.selected && "ring-orange-300 shadow-sm",
          defaultClassNames.day,
          className
        )}
        style={{
          ...(isSpecialDay && !modifiers.selected && {
            backgroundColor: isPublicHoliday ? '#fef2f2' : '#fff7ed',
            borderColor: eventColor
          })
        }}
        {...props}
      >
        {/* Solar date (main) */}
        <span className={cn(
          "text-base font-semibold leading-none",
          isPublicHoliday && "text-red-700",
          isSpecialDay && !isPublicHoliday && "text-orange-700"
        )}>
          {day.date.getDate()}
        </span>

        {/* Lunar date (smaller, below) */}
        <span className="text-xs opacity-70 leading-none text-orange-600 font-medium">
          {lunarDay}
        </span>

        {/* Holiday/Special event indicator */}
        {specialEvent && (
          <span
            className="text-xs leading-none font-bold px-1 py-0.5 rounded text-center max-w-full overflow-hidden"
            style={{
              backgroundColor: eventColor + '20',
              color: eventColor,
              fontSize: '9px',
              lineHeight: '10px'
            }}
            title={specialEvent.name}
          >
            {specialEvent.shortName}
          </span>
        )}

        {/* Weather indicator */}
        {dayWeather && (
          <div className="absolute top-0 right-0 text-xs opacity-60" title={`${dayWeather.tempMin}°-${dayWeather.tempMax}°C • ${dayWeather.description}`}>
            {dayWeather.icon}
          </div>
        )}
      </Button>

      {/* Label for departure date */}
      {isDepartureDate && isReturnCalendar && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full z-20">
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap shadow-lg">
            Ngày đi
          </span>
        </div>
      )}


    </div>
  )
}

export { Calendar, CalendarDayButton }
