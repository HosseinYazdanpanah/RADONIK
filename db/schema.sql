-- RADONIK Neon PostgreSQL; no customer records or checkout credentials
CREATE TABLE IF NOT EXISTS products(
 id TEXT PRIMARY KEY,
 title TEXT NOT NULL,
 category TEXT NOT NULL,
 price_toman BIGINT CHECK(price_toman >= 0),
 source_url TEXT,
 image_url TEXT,
 summary TEXT,
 is_published BOOLEAN NOT NULL DEFAULT TRUE,
 sort_order INTEGER NOT NULL DEFAULT 100,
 source_verified_on DATE,
 created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category,sort_order);
CREATE TABLE IF NOT EXISTS source_pages(
 url TEXT PRIMARY KEY,
 content_type TEXT NOT NULL,
 inspection_status TEXT NOT NULL CHECK (inspection_status IN ('verified','partial','pending','conflict')),
 notes TEXT,
 inspected_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
