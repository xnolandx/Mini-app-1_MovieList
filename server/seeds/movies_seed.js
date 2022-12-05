/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {id: 1, title: 'Mean Girls', user_added: false},
    {id: 2, title: 'Hackers', user_added: false},
    {id: 3, title: 'The Grey', user_added: false},
    {id: 4, title: 'Sunshine', user_added: false},
    {id: 5, title: 'Ex Machina', user_added: false}
  ]);
};
