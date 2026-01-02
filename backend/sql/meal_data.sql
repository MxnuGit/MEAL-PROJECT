START TRANSACTION;

-- --------------------------------------------------------
-- USERS
-- --------------------------------------------------------

INSERT INTO users (username, password, role)
VALUES
('admin', '$2y$10$abcdefghijklmnopqrstuv', 'admin'),
('chef1', '$2y$10$abcdefghijklmnopqrstuv', 'user'),
('chef2', '$2y$10$abcdefghijklmnopqrstuv', 'user');

-- --------------------------------------------------------
-- TAG
-- --------------------------------------------------------

INSERT INTO tag (tag_name)
VALUES
('vegan'),
('vegetarian'),
('gluten-free'),
('quick'),
('italian');

-- --------------------------------------------------------
-- INGREDIENTS
-- --------------------------------------------------------

INSERT INTO ingredients (name)
VALUES
('pasta'),
('tomato'),
('olive oil'),
('garlic'),
('basil'),
('cheese');

-- --------------------------------------------------------
-- UNIT OF MEASUREMENT
-- --------------------------------------------------------

INSERT INTO unit_of_measurement (measurement)
VALUES
('grams'),
('ml'),
('pieces');

-- --------------------------------------------------------
-- MEASURED_IN
-- --------------------------------------------------------

INSERT INTO measured_in (INGREDIENTS_name, UNIT_OF_MEASUREMENT_measurement)
VALUES
('pasta', 'grams'),
('tomato', 'grams'),
('olive oil', 'ml'),
('garlic', 'pieces'),
('basil', 'grams'),
('cheese', 'grams');

-- --------------------------------------------------------
-- RECIPES
-- --------------------------------------------------------

INSERT INTO recipes
(name, prep_time, difficulty, description, course, recipe_image, USERS_username)
VALUES
(
  'Pasta al Pomodoro',
  30,
  'easy',
  'Classic Italian pasta with tomato sauce.',
  'main',
  '',
  'chef1'
),
(
  'Aglio e Olio',
  20,
  'easy',
  'Traditional pasta with garlic and olive oil.',
  'main',
  '',
  'chef1'
),
(
  'Cheese Pasta',
  25,
  'medium',
  'Creamy pasta with cheese.',
  'main',
  '',
  'chef2'
);

-- --------------------------------------------------------
-- ACCEPTS (RECIPES ↔ TAG)
-- --------------------------------------------------------

INSERT INTO accepts (RECIPES_recipe_id, TAG_tag_name)
VALUES
(1, 'vegetarian'),
(1, 'italian'),
(1, 'quick'),
(2, 'vegan'),
(2, 'italian'),
(2, 'quick'),
(3, 'vegetarian');

-- --------------------------------------------------------
-- HAS (RECIPES ↔ INGREDIENTS)
-- --------------------------------------------------------

INSERT INTO has (RECIPES_recipe_id, INGREDIENTS_name, quantity)
VALUES
(1, 'pasta', 200),
(1, 'tomato', 150),
(1, 'olive oil', 20),
(1, 'basil', 5),

(2, 'pasta', 200),
(2, 'olive oil', 25),
(2, 'garlic', 2),

(3, 'pasta', 200),
(3, 'cheese', 100),
(3, 'olive oil', 15);

-- --------------------------------------------------------
-- PREPARATIONS
-- --------------------------------------------------------

INSERT INTO preparations (RECIPES_recipe_id, step_number, step_desc)
VALUES
(1, 1, 'Boil pasta in salted water.'),
(1, 2, 'Cook tomatoes with olive oil.'),
(1, 3, 'Mix pasta with sauce and basil.'),

(2, 1, 'Boil pasta in salted water.'),
(2, 2, 'Fry garlic in olive oil.'),
(2, 3, 'Combine pasta with garlic oil.'),

(3, 1, 'Boil pasta in salted water.'),
(3, 2, 'Prepare cheese sauce.'),
(3, 3, 'Mix pasta with cheese sauce.');

-- --------------------------------------------------------

COMMIT;
