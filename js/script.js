$(document).ready(function () {
	let initPage = (callback) => {
		switchThemeFunction(function () {
			headersEvenets(function () {
				homeSectionEvents(function () {
					contactSectionEvents(function () {
						if (callback)
							callback();
					});
				});
			});
		});
	}

	let switchThemeFunction = (callback) => {
		const themeSwitcher = $("#theme-switcher");
		const darkThemeLink = $("#dark-theme");
		const lightThemeLink = $("#light-theme");
		const body = $("body");

		const savedTheme = localStorage.getItem("theme");
		setTheme(savedTheme);

		function setTheme(theme) {
			var setedTheme = "";

			if (theme === "light" || theme === null) {
				body.removeClass("dark");
				body.addClass("light");

				setedTheme = "light";

				themeSwitcher.find("i").removeClass("bx bx-sun");
				themeSwitcher.find("i").addClass("bx bx-moon");

				darkThemeLink.prop("disabled", true);
				lightThemeLink.prop("disabled", false);
			}
			else {
				body.removeClass("light");
				body.addClass("dark");

				setedTheme = "dark";

				themeSwitcher.find("i").removeClass("bx bx-moon");
				themeSwitcher.find("i").addClass("bx bx-sun");

				darkThemeLink.prop("disabled", false);
				lightThemeLink.prop("disabled", true);
			}

			localStorage.setItem("theme", setedTheme);
		}

		themeSwitcher.off("click");
		themeSwitcher.on("click", function (ev) {
			const currentTheme = body.hasClass("dark") ? "light" : "dark";
			setTheme(currentTheme);
		});

		if (callback)
			callback();
	}

	let headersEvenets = (callback) => {
		const menuHamburguer = $(".menu-hamburguer");
		menuHamburguer[0].addEventListener("click", function () {
			const nav = $(".nav-responsive")[0];

			menuHamburguer.toggleClass("change");

			if (menuHamburguer.hasClass("change"))
				nav.style.display = "block";
			else
				nav.style.display = "none";
		});

		$(".nav > a, .nav-responsive > a").off("click");
		$(".nav > a, .nav-responsive > a").on("click", function (ev) {
			ev.preventDefault();

			var nav = $(this).parent();
			nav.find("a").removeClass("active");
			$(this).addClass("active");

			document.querySelector(this.getAttribute("href")).scrollIntoView({
				behavior: "smooth"
			});
		});

		if (callback)
			callback();
	}

	function homeSectionEvents(callback) {
		$(".btnGitHub").off("click");
		$(".btnGitHub").on("click", function (ev) {
			window.open("https://github.com/Pedro-CRS", "_blank");
		});

		$(".btnLinkedIn").off("click");
		$(".btnLinkedIn").on("click", function (ev) {
			window.open("https://www.linkedin.com/in/pedro-henrique-24607a154/", "_blank");
		});

		$(".btnWhatsApp").off("click");
		$(".btnWhatsApp").on("click", function (ev) {
			window.open("https://wa.me/5517982273946", "_blank");
		});

		$(".btnResume").off("click");
		$(".btnResume").on("click", function (ev) {
			window.open("https://docs.google.com/document/d/14GqAn3WyQJ0ef5SSA-7ehPWOWRf0dZ5QWQePiKYDvSc/export?format=pdf");
		});

		if (callback)
			callback();
	}

	function skilsSectionEvents(callback) {

		if (callback)
			callback();
	}

	function contactSectionEvents(callback) {
		$("#sendEmailBtn").off("click");
		$("#sendEmailBtn").on("click", function (ev) {
			alert("Não funciona ainda, fiz só o estilo");
		});

		if (callback)
			callback();
	}

	initPage();
});