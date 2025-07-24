-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    provider TEXT DEFAULT 'email',
    provider_id TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    nationality TEXT,
    passport_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create airlines table
CREATE TABLE public.airlines (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL, -- VN, VJ, BL, QH
    name TEXT NOT NULL,
    logo_url TEXT,
    country TEXT NOT NULL DEFAULT 'Vietnam',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create airports table
CREATE TABLE public.airports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL, -- HAN, SGN, DAD, etc.
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Vietnam',
    timezone TEXT NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create flights table
CREATE TABLE public.flights (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    airline_id UUID REFERENCES public.airlines(id) NOT NULL,
    flight_number TEXT NOT NULL,
    departure_airport_id UUID REFERENCES public.airports(id) NOT NULL,
    arrival_airport_id UUID REFERENCES public.airports(id) NOT NULL,
    departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
    arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    aircraft_type TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    available_seats INTEGER NOT NULL,
    total_seats INTEGER NOT NULL,
    status TEXT CHECK (status IN ('scheduled', 'delayed', 'cancelled', 'boarding', 'departed', 'arrived')) DEFAULT 'scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create bookings table
CREATE TABLE public.bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    flight_id UUID REFERENCES public.flights(id) NOT NULL,
    booking_reference TEXT UNIQUE NOT NULL,
    passenger_name TEXT NOT NULL,
    passenger_email TEXT NOT NULL,
    passenger_phone TEXT NOT NULL,
    seat_number TEXT,
    ticket_class TEXT CHECK (ticket_class IN ('economy', 'business', 'first')) DEFAULT 'economy',
    total_price DECIMAL(10, 2) NOT NULL,
    booking_status TEXT CHECK (booking_status IN ('confirmed', 'cancelled', 'pending')) DEFAULT 'pending',
    payment_status TEXT CHECK (payment_status IN ('paid', 'pending', 'failed', 'refunded')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create search_history table
CREATE TABLE public.search_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id), -- Nullable for guest searches
    from_airport TEXT NOT NULL,
    to_airport TEXT NOT NULL,
    departure_date DATE NOT NULL,
    return_date DATE,
    passengers INTEGER NOT NULL DEFAULT 1,
    trip_type TEXT CHECK (trip_type IN ('oneway', 'roundtrip')) DEFAULT 'oneway',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.airlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.airports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Airlines policies (public read)
CREATE POLICY "Airlines are viewable by everyone." ON public.airlines
    FOR SELECT USING (true);

-- Airports policies (public read)
CREATE POLICY "Airports are viewable by everyone." ON public.airports
    FOR SELECT USING (true);

-- Flights policies (public read)
CREATE POLICY "Flights are viewable by everyone." ON public.flights
    FOR SELECT USING (true);

-- Bookings policies (user specific)
CREATE POLICY "Users can view own bookings." ON public.bookings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings." ON public.bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings." ON public.bookings
    FOR UPDATE USING (auth.uid() = user_id);

-- Search history policies
CREATE POLICY "Users can view own search history." ON public.search_history
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert search history." ON public.search_history
    FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Functions

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_flights_updated_at BEFORE UPDATE ON public.flights
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Insert sample data

-- Airlines
INSERT INTO public.airlines (code, name, logo_url, country) VALUES
('VN', 'Vietnam Airlines', 'https://logos-world.net/wp-content/uploads/2023/01/Vietnam-Airlines-Logo.png', 'Vietnam'),
('VJ', 'VietJet Air', 'https://logos-world.net/wp-content/uploads/2023/01/VietJet-Air-Logo.png', 'Vietnam'),
('BL', 'Jetstar Pacific', 'https://logos-world.net/wp-content/uploads/2023/01/Jetstar-Logo.png', 'Vietnam'),
('QH', 'Bamboo Airways', 'https://logos-world.net/wp-content/uploads/2023/01/Bamboo-Airways-Logo.png', 'Vietnam');

-- Airports
INSERT INTO public.airports (code, name, city, country, timezone, latitude, longitude) VALUES
('HAN', 'Noi Bai International Airport', 'Hanoi', 'Vietnam', 'Asia/Ho_Chi_Minh', 21.2212, 105.8012),
('SGN', 'Tan Son Nhat International Airport', 'Ho Chi Minh City', 'Vietnam', 'Asia/Ho_Chi_Minh', 10.8188, 106.6519),
('DAD', 'Da Nang International Airport', 'Da Nang', 'Vietnam', 'Asia/Ho_Chi_Minh', 16.0439, 108.1994),
('CXR', 'Cam Ranh International Airport', 'Nha Trang', 'Vietnam', 'Asia/Ho_Chi_Minh', 11.9983, 109.2192),
('PQC', 'Phu Quoc International Airport', 'Phu Quoc', 'Vietnam', 'Asia/Ho_Chi_Minh', 10.2270, 103.9678),
('HUI', 'Phu Bai International Airport', 'Hue', 'Vietnam', 'Asia/Ho_Chi_Minh', 16.4015, 107.7026),
('DLI', 'Lien Khuong Airport', 'Da Lat', 'Vietnam', 'Asia/Ho_Chi_Minh', 11.7500, 108.3667),
('VCA', 'Can Tho International Airport', 'Can Tho', 'Vietnam', 'Asia/Ho_Chi_Minh', 10.0851, 105.7117),
('HPH', 'Cat Bi International Airport', 'Hai Phong', 'Vietnam', 'Asia/Ho_Chi_Minh', 20.8193, 106.7244),
('VDO', 'Van Don International Airport', 'Quang Ninh', 'Vietnam', 'Asia/Ho_Chi_Minh', 21.1122, 107.4169);

-- Sample flights (you can add more)
INSERT INTO public.flights (
    airline_id,
    flight_number,
    departure_airport_id,
    arrival_airport_id,
    departure_time,
    arrival_time,
    duration_minutes,
    aircraft_type,
    base_price,
    available_seats,
    total_seats
) VALUES
(
    (SELECT id FROM public.airlines WHERE code = 'VN'),
    'VN210',
    (SELECT id FROM public.airports WHERE code = 'HAN'),
    (SELECT id FROM public.airports WHERE code = 'SGN'),
    '2025-01-15 06:00:00+07',
    '2025-01-15 08:15:00+07',
    135,
    'Airbus A321',
    1500000,
    150,
    180
),
(
    (SELECT id FROM public.airlines WHERE code = 'VJ'),
    'VJ150',
    (SELECT id FROM public.airports WHERE code = 'SGN'),
    (SELECT id FROM public.airports WHERE code = 'DAD'),
    '2025-01-15 09:30:00+07',
    '2025-01-15 10:45:00+07',
    75,
    'Airbus A320',
    890000,
    120,
    150
);

-- Create indexes for better performance
CREATE INDEX idx_flights_departure_time ON public.flights(departure_time);
CREATE INDEX idx_flights_departure_airport ON public.flights(departure_airport_id);
CREATE INDEX idx_flights_arrival_airport ON public.flights(arrival_airport_id);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_search_history_user_id ON public.search_history(user_id);
CREATE INDEX idx_profiles_email ON public.profiles(email);
