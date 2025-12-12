START TRANSACTION;

-- =====================
-- USERS
-- =====================
INSERT INTO users (username, password, role)
VALUES
('admin', '$2y$10$abcdefghijklmnopqrstuv', 'admin'),
('mario', '$2y$10$abcdefghijklmnopqrstuv', 'user'),
('luigi', '$2y$10$abcdefghijklmnopqrstuv', 'user');

-- =====================
-- UNIT OF MEASUREMENT
-- =====================
INSERT INTO unit_of_measurement (measurement)
VALUES
('g'),
('ml'),
('pz'),
('cucchiaio'),
('cucchiaino');

-- =====================
-- INGREDIENTS
-- =====================
INSERT INTO ingredients (name)
VALUES
('Pasta'),
('Pomodoro'),
('Olio extravergine'),
('Sale'),
('Basilico'),
('Uova'),
('Guanciale'),
('Pecorino');

-- =====================
-- MEASURED IN
-- =====================
INSERT INTO measured_in (INGREDIENTS_name, UNIT_OF_MEASUREMENT_measurement)
VALUES
('Pasta', 'g'),
('Pomodoro', 'g'),
('Olio extravergine', 'ml'),
('Sale', 'g'),
('Basilico', 'pz'),
('Uova', 'pz'),
('Guanciale', 'g'),
('Pecorino', 'g');

-- =====================
-- TAG
-- =====================
INSERT INTO tag (tag_name)
VALUES
('italiano'),
('primo'),
('veloce'),
('tradizionale');

-- =====================
-- RECIPES
-- =====================
INSERT INTO recipes (name, prep_time, difficulty, description, course, recipe_image, USERS_username)
VALUES
('Pasta al pomodoro', NOW(), 'Facile', 'Classica pasta al pomodoro italiano', 'Primo', 0x00, 'mario'),
('Carbonara', NOW(), 'Media', 'Ricetta tradizionale romana', 'Primo', 0x00, 'luigi');

-- =====================
-- HAS (INGREDIENTI RICETTE)
-- =====================
INSERT INTO has (RECIPES_recipe_id, INGREDIENTS_name, quantity)
VALUES
-- Pasta al pomodoro
(1, 'Pasta', 100),
(1, 'Pomodoro', 150),
(1, 'Olio extravergine', 10),
(1, 'Sale', 5),
(1, 'Basilico', 3),

-- Carbonara
(2, 'Pasta', 100),
(2, 'Uova', 2),
(2, 'Guanciale', 50),
(2, 'Pecorino', 30),
(2, 'Sale', 5);

-- =====================
-- PREPARATIONS
-- =====================
INSERT INTO preparations (RECIPES_recipe_id, step_number, step_desc)
VALUES
-- Pasta al pomodoro
(1, '1', 'Portare a ebollizione l’acqua salata'),
(1, '2', 'Cuocere la pasta'),
(1, '3', 'Preparare il sugo di pomodoro'),
(1, '4', 'Unire pasta e sugo e servire'),

-- Carbonara
(2, '1', 'Cuocere la pasta in acqua salata'),
(2, '2', 'Rosolare il guanciale'),
(2, '3', 'Mescolare uova e pecorino'),
(2, '4', 'Unire tutto a fuoco spento');

-- =====================
-- ACCEPTS (TAG RICETTE)
-- =====================
INSERT INTO accepts (RECIPES_recipe_id, TAG_tag_name)
VALUES
(1, 'italiano'),
(1, 'primo'),
(1, 'veloce'),
(2, 'italiano'),
(2, 'primo'),
(2, 'tradizionale');

COMMIT;