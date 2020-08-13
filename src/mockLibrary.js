var mock = {
	user: function() {
		var firstName = ["Roosevelt", "Kacy", "Wilbert", "Kory", "Freddy", "Addie", "Cherie", "Troy", "Iluminada", "Scot", "Tona", "Orval", "Shondra", "Monica", "Shauna", "Kimbery", "Waylon", "Pura", "Brian", "Emilee"];
		var lastName= ["Lomanto", "Deckert", "Arrowood", "Juhasz", "Kennan", "Pizzo", "Canales", "Choe", "Pavlick", "Weatherford", "Pentz", "Hughey", "Kieser", "Stabile", "Griffy", "Lechuga", "Langlais", "Mcguigan", "Niday", "Bridgeforth"];
		var randomFirst = Math.floor(Math.random() * firstName.length); 
		var randomLast = Math.floor(Math.random() * lastName.length); 
		var randomPhone = Math.floor(Math.random() * 10000000);
		var randomDate = Math.floor(Math.random() * 10);
		return {
			first: firstName[randomFirst],
			last: lastName[randomLast],
			full: firstName[randomFirst] + " " + lastName[randomLast],
			email: firstName[randomFirst] + "." + lastName[randomLast] + "@gmail.com",
			phone: randomPhone,
			date: randomDate + "/15/201" + randomDate
		};
	},
	tableRow: function(howMany) {
		if (howMany == null) howMany = 1;
		var dataArray = [];
		for (var intI = 0; intI < howMany; intI++) {
			var userName = mock.user();
			dataArray.push({
				data: [
					userName.full,
					"Eget Incorporated",
					"9557",
					userName.date,
					userName.email,
					userName.phone,
					"<a href='//www.dell.com'>Dell Home Page</a>"
				],
				details: userName.full + " details"
			});
		}
		return dataArray;
	}
};