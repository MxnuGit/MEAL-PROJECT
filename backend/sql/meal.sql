-- phpMyAdmin SQL Dump
-- Database: meal
-- MariaDB 10.4+
-- Charset: utf8mb4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

SET NAMES utf8mb4;

-- --------------------------------------------------------
-- USERS
-- --------------------------------------------------------

CREATE TABLE users (
  username VARCHAR(255) NOT NULL,
  password CHAR(60) NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- TAG
-- --------------------------------------------------------

CREATE TABLE tag (
  tag_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (tag_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- INGREDIENTS
-- --------------------------------------------------------

CREATE TABLE ingredients (
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- UNIT OF MEASUREMENT
-- --------------------------------------------------------

CREATE TABLE unit_of_measurement (
  measurement VARCHAR(255) NOT NULL,
  PRIMARY KEY (measurement)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- RECIPES (PARENT TABLE)
-- --------------------------------------------------------

CREATE TABLE recipes (
  recipe_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  prep_time INT NOT NULL,
  difficulty VARCHAR(255) NOT NULL,
  description LONGTEXT NOT NULL,
  course VARCHAR(255) NOT NULL,
  recipe_image MEDIUMBLOB NOT NULL,
  USERS_username VARCHAR(255) NOT NULL,
  PRIMARY KEY (recipe_id),
  KEY idx_recipes_user (USERS_username),
  CONSTRAINT fk_recipes_user
    FOREIGN KEY (USERS_username)
    REFERENCES users(username)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- ACCEPTS (RECIPES ↔ TAG)
-- --------------------------------------------------------

CREATE TABLE accepts (
  RECIPES_recipe_id INT NOT NULL,
  TAG_tag_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (RECIPES_recipe_id, TAG_tag_name),
  KEY idx_accepts_tag (TAG_tag_name),
  CONSTRAINT fk_accepts_recipe
    FOREIGN KEY (RECIPES_recipe_id)
    REFERENCES recipes(recipe_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_accepts_tag
    FOREIGN KEY (TAG_tag_name)
    REFERENCES tag(tag_name)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- HAS (RECIPES ↔ INGREDIENTS)
-- --------------------------------------------------------

CREATE TABLE has (
  RECIPES_recipe_id INT NOT NULL,
  INGREDIENTS_name VARCHAR(255) NOT NULL,
  quantity INT DEFAULT NULL,
  PRIMARY KEY (RECIPES_recipe_id, INGREDIENTS_name),
  KEY idx_has_ingredient (INGREDIENTS_name),
  CONSTRAINT fk_has_recipe
    FOREIGN KEY (RECIPES_recipe_id)
    REFERENCES recipes(recipe_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_has_ingredient
    FOREIGN KEY (INGREDIENTS_name)
    REFERENCES ingredients(name)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- PREPARATIONS (RECIPE STEPS)
-- --------------------------------------------------------

CREATE TABLE preparations (
  RECIPES_recipe_id INT NOT NULL,
  step_number INT NOT NULL,
  step_desc LONGTEXT NOT NULL,
  PRIMARY KEY (RECIPES_recipe_id, step_number),
  CONSTRAINT fk_preparations_recipe
    FOREIGN KEY (RECIPES_recipe_id)
    REFERENCES recipes(recipe_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- MEASURED_IN (INGREDIENTS ↔ UNITS)
-- --------------------------------------------------------

CREATE TABLE measured_in (
  INGREDIENTS_name VARCHAR(255) NOT NULL,
  UNIT_OF_MEASUREMENT_measurement VARCHAR(255) NOT NULL,
  PRIMARY KEY (INGREDIENTS_name, UNIT_OF_MEASUREMENT_measurement),
  KEY idx_measured_unit (UNIT_OF_MEASUREMENT_measurement),
  CONSTRAINT fk_measured_ingredient
    FOREIGN KEY (INGREDIENTS_name)
    REFERENCES ingredients(name)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_measured_unit
    FOREIGN KEY (UNIT_OF_MEASUREMENT_measurement)
    REFERENCES unit_of_measurement(measurement)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

COMMIT;