var ������ = db.��������.aggregate([

{$match:{$expr:{ $eq: [{$month:"$����"}, 5]}}},

{$match:{$expr:{ $eq: [{$year:"$����"}, 1997]}}},

{$lookup: {

         from: "��������",
         localField: "��� ��������",
         foreignField: "��� ��������",
         as: "��������"

}},

{$unwind: "$�������"},

{$lookup: {

from: "������",

localField: "�������.��� ������",

foreignField: "��� ������",

as: "������"

}},

{$match: { "��������.�����": "�������" } },

{$group:{_id: "$������.��� ������"}},

{$unwind:{path:"$_id"}}

]).toArray().map(x => x._id);

var ���������  = db.������.aggregate ([{$group:{_id: "$��� ������"}}, {$unwind:{path:"$_id"}}]).toArray().map(x => x._id);

var �������1 = ���������.filter(x => !������.includes(x));

db.������.find ({"��� ������" : {"$in" : �������1}}, {�����:1, _id:0})
