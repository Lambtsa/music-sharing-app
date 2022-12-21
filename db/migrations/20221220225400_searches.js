/** @type {import('knex').Knex.Migration['up']} */
const TABLE = "searches";

exports.up = async function (knex) {
  await knex.schema.raw(/* sql */ `
    CREATE TABLE "public"."${TABLE}" (
      "id" UUID NOT NULL PRIMARY KEY,
      "ip" varchar(255) NOT NULL,
      "city" varchar(255) NOT NULL,
      "country" varchar(255) NOT NULL,
      "coordinates" varchar(255) NOT NULL,
      "search" varchar(255) NOT NULL,
      "timezone" varchar(255) NOT NULL,
      "search_type" TEXT NOT NULL CHECK(
        "search_type" = ANY(
          ARRAY[
            'artist'::text,
            'track'::text,
            'url'::text
          ]
        )
      ),
      "url_type" TEXT CHECK ("url_type" IN ('Spotify', 'Deezer', 'Youtube') ),
      "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

/** @type {import('knex').Knex.Migration['down']} */
exports.down = async function (knex) {
  // Drop table
  await knex.schema.dropTable(TABLE);
};
