var товары = db.Договоры.aggregate([

{$match:{$expr:{ $eq: [{$month:"$Дата"}, 5]}}},

{$match:{$expr:{ $eq: [{$year:"$Дата"}, 1997]}}},

{$lookup: {

         from: "Продавцы",
         localField: "Код продавца",
         foreignField: "Код продавца",
         as: "Продавец"

}},

{$unwind: "$Продажи"},

{$lookup: {

from: "Товары",

localField: "Продажи.Код товара",

foreignField: "Код товара",

as: "ТоварП"

}},

{$match: { "Продавец.Город": "Шелехов" } },

{$group:{_id: "$ТоварП.Код товара"}},

{$unwind:{path:"$_id"}}

]).toArray().map(x => x._id);

var всетовары  = db.Товары.aggregate ([{$group:{_id: "$Код товара"}}, {$unwind:{path:"$_id"}}]).toArray().map(x => x._id);

var разница1 = всетовары.filter(x => !товары.includes(x));

db.Товары.find ({"Код товара" : {"$in" : разница1}}, {Товар:1, _id:0})
