db.��������.aggregate([
{$match:{$expr:{ $eq: [{$month:"$����"}, 6]}}},
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
         as: "�����"
       }},
{$match: { "�����.������ �������": "�����" } },
{$group:{_id: {��������: "$��������.��������"}}},
])
