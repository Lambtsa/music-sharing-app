/** @type {import('knex').Knex.Migration['up']} */
const TABLE = "searches";

exports.up = async function (knex) {
  await knex.schema.raw(/* sql */ `
    CREATE TABLE "public"."${TABLE}" (
      "id" UUID NOT NULL PRIMARY KEY,
      "ip" varchar(255) NOT NULL,
      "location" varchar(255) NOT NULL,
      "search" varchar(255) NOT NULL,
      "search_type" TEXT NOT NULL CHECK(
        "search_type" = ANY(
          ARRAY[
            'Artist'::text,
            'Track'::text,
            'Url'::text
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
