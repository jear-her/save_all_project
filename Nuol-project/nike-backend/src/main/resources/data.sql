-- Seed Products
INSERT INTO products (name, subtitle, category, price, original_price, rating, review_count, image, badge, description, in_stock) VALUES
('Nike Air Max 270', 'Men''s Shoes', 'airmax', 150.00, 170.00, 4.5, 120, 'https://images.nike.com/is/image/DotCom/AH8050_002_A_PREM?wid=1000&fmt=jpeg', 'Sale', 'The Nike Air Max 270 is the first-ever Max Air unit designed specifically for lifestyle.', true),
('Nike Air Force 1 ''07', 'Men''s Shoes', 'lifestyle', 110.00, 110.00, 4.8, 450, 'https://images.nike.com/is/image/DotCom/CW2288_111_A_PREM?wid=1000&fmt=jpeg', 'Popular', 'The radiance lives on in the Nike Air Force 1 ''07, the b-ball icon that puts a fresh spin on what you know best.', true),
('Nike Pegasus 40', 'Men''s Road Running Shoes', 'running', 130.00, 130.00, 4.6, 85, 'https://images.nike.com/is/image/DotCom/DV3853_101_A_PREM?wid=1000&fmt=jpeg', 'New', 'A springy ride for every run, the Pegasus’ familiar, just-for-you feel returns to help you accomplish your goals.', true),
('Air Jordan 1 Low', 'Men''s Shoes', 'jordan', 110.00, 110.00, 4.9, 320, 'https://images.nike.com/is/image/DotCom/553558_136_A_PREM?wid=1000&fmt=jpeg', 'Limited', 'Inspired by the original that debuted in 1985, the Air Jordan 1 Low offers a clean, classic look.', true),
('Nike Dunk Low', 'Men''s Shoes', 'lifestyle', 115.00, 115.00, 4.7, 210, 'https://images.nike.com/is/image/DotCom/DD1391_100_A_PREM?wid=1000&fmt=jpeg', 'Popular', 'Created for the hardwood but taken to the streets, the Nike Dunk Low returns with crisp overlays.', true),
('Nike Air Max Pulse', 'Men''s Shoes', 'airmax', 150.00, 150.00, 4.4, 45, 'https://images.nike.com/is/image/DotCom/DR0453_001_A_PREM?wid=1000&fmt=jpeg', 'New', 'Mixing urban edge with tough-as-nails performance, the Air Max Pulse brings a point-loaded Air unit.', true),
('Nike Zoom Fly 5', 'Men''s Road Running Shoes', 'running', 160.00, 160.00, 4.3, 38, 'https://images.nike.com/is/image/DotCom/DM8968_001_A_PREM?wid=1000&fmt=jpeg', 'New', 'Bridge the gap between your weekend training run and race day with a durable design.', true),
('Air Jordan 1 Mid', 'Men''s Shoes', 'jordan', 125.00, 125.00, 4.8, 180, 'https://images.nike.com/is/image/DotCom/DQ8426_106_A_PREM?wid=1000&fmt=jpeg', 'Popular', 'The Air Jordan 1 Mid brings full-court style and premium comfort to an iconic look.', true);

-- Seed Product Colors
INSERT INTO product_colors (product_id, color) VALUES
(1, 'White/Black/Cyan'), (1, 'Black/Red'),
(2, 'White/White'), (2, 'Black/Black'),
(3, 'White/Blue'), (3, 'Black/White'),
(4, 'White/Green'), (4, 'Bred'),
(5, 'Panda'), (5, 'Grey/White'),
(6, 'Black/Anthracite'),
(7, 'Black/White'),
(8, 'Red/White/Black');

-- Seed Product Sizes
INSERT INTO product_sizes (product_id, size) VALUES
(1, 'US 8'), (1, 'US 9'), (1, 'US 10'), (1, 'US 11'),
(2, 'US 7'), (2, 'US 8'), (2, 'US 9'), (2, 'US 10'), (2, 'US 11'), (2, 'US 12'),
(3, 'US 8'), (3, 'US 9'), (3, 'US 10'), (3, 'US 11'),
(4, 'US 7'), (4, 'US 8'), (4, 'US 9'), (4, 'US 10'), (4, 'US 11'),
(5, 'US 7'), (5, 'US 8'), (5, 'US 9'), (5, 'US 10'), (5, 'US 11'),
(6, 'US 8'), (6, 'US 9'), (6, 'US 10'), (6, 'US 11'),
(7, 'US 8'), (7, 'US 9'), (7, 'US 10'), (7, 'US 11'),
(8, 'US 7'), (8, 'US 8'), (8, 'US 9'), (8, 'US 10'), (8, 'US 11');
