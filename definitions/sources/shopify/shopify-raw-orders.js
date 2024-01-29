
["bdmtmy_orders", "blau_orders", "blmy_orders", "blrow_orders", "blsg_orders", "blus_orders", "ccau_offline_orders", "ccau_orders", "ccmy_orders", 
 "ccsg_orders", "ccuae_orders", "crrow_orders", "ebau_orders", "ebeu_orders", "ebsg_orders", "ebuk_orders", "ebus_orders", "lmevents_orders", 
 "luckymax_orders", "mtmy_orders", "mtsg_orders", "mtuae_orders", "offline_orders", "rtmy_orders", "tmau_orders", "tmeu_orders", "tmmy_orders",
 "tmrow_orders", "tmuk_orders", "tmus_orders"]
  .forEach(source => declare({
      database: "rpg-dw-ingestion",
      schema: "shopify_orders",
      name: source
    })
  );