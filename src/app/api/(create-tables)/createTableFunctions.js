import { sql } from "@vercel/postgres";

export async function createTournamentsTable() {
    const { rows } = await sql`
        CREATE TABLE IF NOT EXISTS tournaments (
            id SERIAL PRIMARY KEY,
            date DATE DEFAULT CURRENT_DATE
        );
    `;
    return rows;
};

export async function createUsersTable() {
    const { rows } = await sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            usatt VARCHAR(255) UNIQUE,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            rating INT NOT NULL
        );
    `;
    return rows;
};

export async function createPlayersTable() {
    const { rows } = await sql`
        CREATE TABLE IF NOT EXISTS players (
            id SERIAL PRIMARY KEY,
            tournament_id INT NOT NULL,
            user_id INT NOT NULL,
            FOREIGN KEY (tournament_id) REFERENCES tournaments (id),
            FOREIGN KEY (user_id) REFERENCES users (id)
        );
    `;
    return rows;
};

export async function createGroupsTable() {
    const { rows } = await sql`
        CREATE TABLE IF NOT EXISTS groups (
            id SERIAL PRIMARY KEY,
            tournament_id INT NOT NULL,
            num INT NOT NULL,
            first_place_id INT,
            second_place_id INT,
            third_place_id INT,
            fourth_place_id INT,
            FOREIGN KEY (tournament_id) REFERENCES tournaments (id),
            FOREIGN KEY (first_place_id) REFERENCES players (id),
            FOREIGN KEY (second_place_id) REFERENCES players (id),
            FOREIGN KEY (third_place_id) REFERENCES players (id),
            FOREIGN KEY (fourth_place_id) REFERENCES players (id)
        );
    `;
    return rows;
};

export async function createGroupMatchesTable() {
    const { rows } = await sql`
        CREATE TABLE IF NOT EXISTS group_matches (
            id SERIAL PRIMARY KEY,
            tournament_id INT NOT NULL,
            group_id INT NOT NULL,
            player_a_id INT,
            player_b_id INT,
            winner_id INT,
            loser_id INT,
            game_1_player_a_points_won INT,
            game_1_player_b_points_won INT,
            game_2_player_a_points_won INT,
            game_2_player_b_points_won INT,
            game_3_player_a_points_won INT,
            game_3_player_b_points_won INT,
            game_4_player_a_points_won INT,
            game_4_player_b_points_won INT,
            game_5_player_a_points_won INT,
            game_5_player_b_points_won INT,
            player_a_games_won INT,
            player_b_games_won INT,
            FOREIGN KEY (tournament_id) REFERENCES tournaments (id),
            FOREIGN KEY (group_id) REFERENCES groups (id),
            FOREIGN KEY (player_a_id) REFERENCES players (id),
            FOREIGN KEY (player_b_id) REFERENCES players (id),
            FOREIGN KEY (winner_id) REFERENCES players (id),
            FOREIGN KEY (loser_id) REFERENCES players (id)
        );
    `;
    return rows;
};

export async function createMainDrawMatchesTable() {
    const { rows } = await sql`
        CREATE TABLE IF NOT EXISTS main_draw_matches (
            id SERIAL PRIMARY KEY,
            tournament_id INT NOT NULL,
            round VARCHAR(255) NOT NULL,
            player_a_id INT,
            player_b_id INT,
            winner_id INT,
            loser_id INT,
            game_1_player_a_points_won INT,
            game_1_player_b_points_won INT,
            game_2_player_a_points_won INT,
            game_2_player_b_points_won INT,
            game_3_player_a_points_won INT,
            game_3_player_b_points_won INT,
            game_4_player_a_points_won INT,
            game_4_player_b_points_won INT,
            game_5_player_a_points_won INT,
            game_5_player_b_points_won INT,
            player_a_games_won INT,
            player_b_games_won INT,
            FOREIGN KEY (tournament_id) REFERENCES tournaments (id),
            FOREIGN KEY (player_a_id) REFERENCES players (id),
            FOREIGN KEY (player_b_id) REFERENCES players (id),
            FOREIGN KEY (winner_id) REFERENCES players (id),
            FOREIGN KEY (loser_id) REFERENCES players (id)
        );
    `;
    return rows;
};