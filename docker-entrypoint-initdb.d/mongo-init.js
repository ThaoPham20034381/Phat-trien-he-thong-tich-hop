print(
  "Start #################################################################"
);

db = db.getSiblingDB("Store");
db.createUser({
  user: "root",
  pwd: "abc",
  roles: [{ role: "dbOwner", db: "Store" }],
});
db.createCollection("users");

print("END #################################################################");
