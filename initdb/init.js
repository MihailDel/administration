carRepairShop = db.getSiblingDB("carRepairShop");
carRepairShop.services.insertMany(
	[
		{
			"_id": "1",
			"name": "Замена масла",
			"cost": "5000 руб",
			"periodOfExecution": "1 день"
		},
		{
			"_id": "2",
			"name": "Проверка двигателя",
			"cost": "5000 руб",
			"periodOfExecution": "5 дней"
		},
		{
			"_id": "3",
			"name": "Прошивка двигателя",
			"cost": "50000 руб",
			"periodOfExecution": "10 дней"
		}
	]
);

carRepairShop.employees.insertMany(
	[{
		"_id": "1",
		"last_name":"Рязанов",
		"first_name":"Михаил",
		"patronymic":"Игоревич",
		"position":"Директор",
		"salary":"1000000"
	},
	{
		"_id": "2",
		"last_name":"Райс",
		"first_name":"Андрей",
		"patronymic":"Андреевич",
		"position":"Автослесарь",
		"salary":"10000"
	},
	{
		"_id": "3",
		"last_name":"Тимохин",
		"first_name":"Данил",
		"patronymic":"Сергеевич",
		"position":"Автослесарь",
		"salary":"10000"
	}]
);

carRepairShop.entries.insertMany(
	[
		{
		"_id":"1",
		"first_name":"Иван",
		"last_name":"Иванов",
		"telephoneNumber":"+79874321212",
		"dateEntry":"25.05.2024"
	}
	]
);