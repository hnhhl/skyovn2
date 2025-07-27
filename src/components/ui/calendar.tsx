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
        "bg-background group/calendar p-0 [--cell-size:3.2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent min-w-[380px]",
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
        root: cn("w-fit min-w-[380px]", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-0 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-0", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 z-20 flex w-full items-center justify-between gap-2 px-4 py-3",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-8 w-8 select-none p-0 aria-disabled:opacity-40 hover:bg-blue-100 hover:text-blue-700 hover:shadow-sm transition-all duration-200 rounded-lg border border-blue-200/60 bg-white/90 backdrop-blur-sm shadow-sm",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-8 w-8 select-none p-0 aria-disabled:opacity-40 hover:bg-blue-100 hover:text-blue-700 hover:shadow-sm transition-all duration-200 rounded-lg border border-blue-200/60 bg-white/90 backdrop-blur-sm shadow-sm",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-14 w-full items-center justify-center px-[--cell-size] bg-gradient-to-r from-blue-600 to-blue-700",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-14 w-full items-center justify-center gap-3 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-white has-focus:ring-white/30 border-white/20 shadow-sm has-focus:ring-2 relative rounded-lg border bg-white/10 backdrop-blur-sm",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "bg-popover absolute inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-bold text-lg text-white",
          captionLayout === "label"
            ? "text-lg"
            : "[&>svg]:text-white/80 flex h-10 items-center gap-2 rounded-lg pl-3 pr-2 text-lg [&>svg]:size-4",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse bg-white",
        weekdays: cn("flex bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100", defaultClassNames.weekdays),
        weekday: cn(
          "text-blue-700 flex-1 select-none text-xs font-bold uppercase tracking-wider py-3 text-center border-r border-blue-100 last:border-r-0",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full border-b border-gray-100 last:border-b-0", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-muted-foreground select-none text-sm font-medium",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none text-center border-r border-gray-100 last:border-r-0 hover:bg-blue-50/50 transition-colors duration-200",
          defaultClassNames.day
        ),
        range_start: cn(
          "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg border-blue-600",
          defaultClassNames.range_start
        ),
        range_middle: cn("bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border-blue-200", defaultClassNames.range_middle),
        range_end: cn("bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border-blue-600", defaultClassNames.range_end),
        today: cn(
          "bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-800 font-semibold border-2 border-emerald-300 shadow-sm relative",
          defaultClassNames.today
        ),
        outside: cn(
          "text-gray-300 aria-selected:text-gray-400 hover:bg-gray-50",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-gray-200 opacity-30 cursor-not-allowed hover:bg-transparent",
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
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl mb-0 transition-all duration-300 shadow-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{hoveredDateWeather?.icon || weather?.icon}</div>
                            <div>
                              <div className="font-bold text-white text-lg">
                                {getCityName(destination)}
                                {hoveredDate && (
                                  <span className="ml-2 text-sm font-normal text-blue-200">
                                    • {hoveredDate.toLocaleDateString('vi-VN')}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-blue-100">
                                {hoveredDateWeather?.description || weather?.description}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">
                              {hoveredDateWeather ? (
                                <span className="text-blue-100">
                                  {hoveredDateWeather.tempMin}° - {hoveredDateWeather.tempMax}°C
                                </span>
                              ) : (
                                <span>{weather?.temperature}°C</span>
                              )}
                            </div>
                            <div className="text-xs text-blue-200">
                              Độ ẩm {hoveredDateWeather?.humidity || weather?.humidity}% • Gió {hoveredDateWeather?.windSpeed || weather?.windSpeed}km/h
                            </div>
                            {hoveredDateWeather && (
                              <div className="text-xs text-blue-200 mt-1 flex items-center gap-1">
                                <span className="animate-pulse">📅</span>
                                <span>Dự báo ngày này</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {/* Show error state */}
                  {weatherLoading.error && (
                    <div className="bg-red-500 text-white p-3 rounded-t-2xl mb-0">
                      <div className="flex items-center gap-2">
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
                className={cn("rounded-2xl shadow-2xl border border-gray-200 bg-white overflow-hidden", className)}
                {...props}
              >
                {children}
              </div>
            </>
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4 text-white", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4 text-white", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4 text-white", className)} {...props} />
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
              <div className="flex size-[--cell-size] items-center justify-center text-center text-blue-600 font-medium bg-blue-50">
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
    <div className="relative h-full">
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
          "data-[selected-single=true]:bg-gradient-to-br data-[selected-single=true]:from-blue-600 data-[selected-single=true]:to-blue-700 data-[selected-single=true]:text-white data-[selected-single=true]:shadow-lg data-[selected-single=true]:border-blue-600 data-[range-middle=true]:bg-blue-100 data-[range-middle=true]:text-blue-800 data-[range-middle=true]:border-blue-200 data-[range-start=true]:bg-gradient-to-br data-[range-start=true]:from-blue-600 data-[range-start=true]:to-blue-700 data-[range-start=true]:text-white data-[range-start=true]:shadow-lg data-[range-start=true]:border-blue-600 data-[range-end=true]:bg-gradient-to-br data-[range-end=true]:from-blue-600 data-[range-end=true]:to-blue-700 data-[range-end=true]:text-white data-[range-end=true]:shadow-lg data-[range-end=true]:border-blue-600 group-data-[focused=true]/day:border-blue-500 group-data-[focused=true]/day:ring-blue-500/30 flex aspect-square h-full w-full min-w-[--cell-size] flex-col gap-0.5 font-normal leading-none p-1 relative transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-sm hover:scale-105 group-data-[focused=true]/day:ring-2",
          // Special styling for departure date in return calendar
          isDepartureDate && isReturnCalendar && "bg-gradient-to-br from-orange-100 to-amber-100 border-2 border-orange-400 text-orange-800 hover:from-orange-200 hover:to-amber-200 ring-2 ring-orange-300 shadow-md",
          // Special styling for holidays and special dates
          isSpecialDay && !modifiers.selected && "ring-2 ring-opacity-60 shadow-sm",
          isPublicHoliday && !modifiers.selected && "bg-gradient-to-br from-red-50 to-pink-50 ring-red-300 text-red-800 shadow-sm",
          isSpecialDay && !isPublicHoliday && !modifiers.selected && "ring-orange-300 shadow-sm bg-gradient-to-br from-orange-50 to-yellow-50",
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
          "text-base font-bold leading-none mb-0.5",
          isPublicHoliday && "text-red-700",
          isSpecialDay && !isPublicHoliday && "text-orange-700"
        )}>
          {day.date.getDate()}
        </span>

        {/* Lunar date (smaller, below) */}
        <span className="text-[10px] opacity-70 leading-none text-gray-500 font-medium">
          {lunarDay}
        </span>

        {/* Holiday/Special event indicator */}
        {specialEvent && (
          <div
            className="absolute bottom-0 left-0 right-0 text-[8px] leading-tight font-bold text-center overflow-hidden px-0.5 py-0.5 rounded-b"
            style={{
              backgroundColor: eventColor,
              color: 'white',
              fontSize: '8px',
              lineHeight: '9px'
            }}
            title={specialEvent.name}
          >
            {specialEvent.shortName}
          </div>
        )}

        {/* Weather indicator */}
        {dayWeather && (
          <div className="absolute top-1 right-1 text-xs opacity-70 bg-white/80 rounded-full p-0.5" title={`${dayWeather.tempMin}°-${dayWeather.tempMax}°C • ${dayWeather.description}`}>
            {dayWeather.icon}
          </div>
        )}

        {/* Today indicator */}
        {modifiers.today && (
          <div className="absolute top-1 left-1 w-2 h-2 bg-emerald-500 rounded-full shadow-sm animate-pulse"></div>
        )}
      </Button>

      {/* Label for departure date - Improved positioning */}
      {isDepartureDate && isReturnCalendar && (
        <div className="absolute -top-1 -right-1 z-20">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap shadow-md border border-orange-700 flex items-center gap-1">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <span>Đi</span>
          </div>
        </div>
      )}
    </div>
  )
}

export { Calendar, CalendarDayButton }