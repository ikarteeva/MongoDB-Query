db.Договоры.aggregate([

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

{$group:{_id: "$ТоварП.Товар"}}

])
