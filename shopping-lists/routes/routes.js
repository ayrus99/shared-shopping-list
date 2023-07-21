import { Router, renderFile } from "../deps.js"
import { client } from "../utils/database.js";

const router = new Router()

router.get("/", async (ctx) => {
    await client.connect();
    const { rows: shoppingListsCount } = await client.queryArray("SELECT COUNT(*) FROM shopping_lists");
    const { rows: itemsCount } = await client.queryArray("SELECT COUNT(*) FROM shopping_list_items");
    await client.end();
    ctx.response.body = await renderFile("views/home.ejs", { shoppingListsCount: Number(shoppingListsCount[0][0]), itemsCount: Number(itemsCount[0][0]) });
});

router.get("/lists", async (ctx) => {
    await client.connect();
    const { rows: shoppingLists } = await client.queryArray("SELECT * FROM shopping_lists WHERE active = true");
    await client.end();
    ctx.response.body = await renderFile("views/lists.ejs", { shoppingLists });
});

router.post("/lists", async (ctx) => {
    await client.connect();
    const formData = await ctx.request.body().value;
    await client.queryObject(`INSERT INTO shopping_lists (name) VALUES ('${formData.get("name")}')`);
    await client.end();
    ctx.response.redirect("/lists");
});

router.post("/lists/:id/deactivate", async (ctx) => {
    const { id } = ctx.params;
    await client.connect();
    await client.queryObject(`UPDATE shopping_lists SET active = false WHERE id = ${id}`);
    await client.end();
    ctx.response.redirect("/lists");
});

router.get("/lists/:id", async (ctx) => {
    const { id } = ctx.params;
    await client.connect();
    const { rows: shoppingList } = await client.queryObject(`SELECT * FROM shopping_lists WHERE id = ${id}`);
    const { rows: items } = await client.queryArray(`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id}`);
    await client.end();
    ctx.response.body = await renderFile("views/shopping_list.ejs", {
        shoppingList: shoppingList[0],
        items,
    });
});

router.post("/lists/:id/items", async (ctx) => {
    const { id } = ctx.params;
    await client.connect();
    const formData = await ctx.request.body().value;
    await client.queryObject(`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${id}, '${formData.get("name")}')`);
    await client.end();
    ctx.response.redirect(`/lists/${id}`);
});

router.post("/lists/:id/items/:item_id/collect", async (ctx) => {
    const { id, item_id } = ctx.params;
    await client.connect();
    await client.queryObject(`UPDATE shopping_list_items SET collected = true WHERE id = ${item_id}`);
    await client.end();
    ctx.response.redirect(`/lists/${id}`);
});




export default router