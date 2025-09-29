-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  skin_tone TEXT,
  body_measurements JSONB DEFAULT '{}'::jsonb,
  style_preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  brand TEXT,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  sizes TEXT[] DEFAULT ARRAY[]::TEXT[],
  colors TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_available BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create cart table
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, product_id, size, color)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  size TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create skin_analysis table
CREATE TABLE public.skin_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  skin_tone TEXT,
  undertone TEXT,
  analysis_results JSONB DEFAULT '{}'::jsonb,
  recommendations JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create virtual_tryons table
CREATE TABLE public.virtual_tryons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  user_image_url TEXT NOT NULL,
  result_image_url TEXT,
  is_saved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skin_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.virtual_tryons ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view and edit their own profile"
ON public.profiles FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for products (public read access)
CREATE POLICY "Anyone can view products"
ON public.products FOR SELECT
USING (true);

-- RLS Policies for cart_items
CREATE POLICY "Users can manage their own cart"
ON public.cart_items FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for order_items
CREATE POLICY "Users can view their order items"
ON public.order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )
);

-- RLS Policies for skin_analysis
CREATE POLICY "Users can manage their own skin analysis"
ON public.skin_analysis FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for virtual_tryons
CREATE POLICY "Users can manage their own virtual try-ons"
ON public.virtual_tryons FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create function to handle user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample products
INSERT INTO public.products (name, description, price, category, subcategory, brand, images, sizes, colors, stock_quantity, tags) VALUES
('Classic Denim Jacket', 'Timeless denim jacket perfect for layering', 89.99, 'Outerwear', 'Jackets', 'StyleCo', ARRAY['https://images.unsplash.com/photo-1544441893-675973e31985?w=500'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Blue', 'Black', 'White'], 50, ARRAY['casual', 'denim', 'classic']),
('Floral Summer Dress', 'Light and breezy floral dress for summer', 65.99, 'Dresses', 'Summer', 'FloralFash', ARRAY['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500'], ARRAY['XS', 'S', 'M', 'L'], ARRAY['Pink', 'Blue', 'Yellow'], 30, ARRAY['floral', 'summer', 'dress']),
('Business Blazer', 'Professional blazer for office wear', 129.99, 'Outerwear', 'Blazers', 'ProWear', ARRAY['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Black', 'Navy', 'Gray'], 25, ARRAY['business', 'professional', 'blazer']),
('Casual T-Shirt', 'Comfortable cotton t-shirt for everyday wear', 24.99, 'Tops', 'T-Shirts', 'ComfortWear', ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'], ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], ARRAY['White', 'Black', 'Gray', 'Navy'], 100, ARRAY['casual', 'cotton', 'basic']),
('Evening Gown', 'Elegant evening gown for special occasions', 299.99, 'Dresses', 'Evening', 'GlamourFash', ARRAY['https://images.unsplash.com/photo-1566479179817-c5e8d5b46e2b?w=500'], ARRAY['XS', 'S', 'M', 'L'], ARRAY['Black', 'Red', 'Navy'], 15, ARRAY['elegant', 'evening', 'formal']),
('Skinny Jeans', 'Modern skinny fit jeans', 79.99, 'Bottoms', 'Jeans', 'DenimCo', ARRAY['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'], ARRAY['24', '26', '28', '30', '32', '34'], ARRAY['Blue', 'Black', 'Gray'], 60, ARRAY['jeans', 'skinny', 'modern']);

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES 
('user-images', 'user-images', true),
('product-images', 'product-images', true),
('skin-analysis', 'skin-analysis', true),
('virtual-tryons', 'virtual-tryons', true);

-- Storage policies
CREATE POLICY "Users can upload their own images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id IN ('user-images', 'skin-analysis', 'virtual-tryons') AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own images" ON storage.objects
FOR SELECT USING (
  bucket_id IN ('user-images', 'skin-analysis', 'virtual-tryons') AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Public access to product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can view public images" ON storage.objects
FOR SELECT USING (bucket_id IN ('user-images', 'product-images', 'skin-analysis', 'virtual-tryons'));