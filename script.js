// Now create the chart

Highcharts.setOptions({
  lang: {
    loading: "Cargando...",
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    weekdays: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    shortMonths: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  },
  colors: ["#929292", "#6c6c6c", "#494949"],
});

draw_chart(
  "container_fallecidos",
  "https://raw.githubusercontent.com/annaabsi/git-scraper-vacunacion/main/resultados/fallecidos_total.csv"
);

$("#total").click(function () {
  $(".button").removeClass("active");
  $(this).addClass("active");
  draw_chart(
    "container_fallecidos",
    "https://raw.githubusercontent.com/annaabsi/git-scraper-vacunacion/main/resultados/fallecidos_total.csv"
  );
});

$("#mayor_18").click(function () {
  $(".button").removeClass("active");
  $(this).addClass("active");
  draw_chart_edad(
    "container_fallecidos",
    "https://raw.githubusercontent.com/annaabsi/git-scraper-vacunacion/main/resultados/fallecidos_edad.csv",
    1
  );
});

$("#mayor_59").click(function () {
  $(".button").removeClass("active");
  $(this).addClass("active");
  draw_chart_edad(
    "container_fallecidos",
    "https://raw.githubusercontent.com/annaabsi/git-scraper-vacunacion/main/resultados/fallecidos_edad.csv",
    2
  );
});

$("#mayor_69").click(function () {
  $(".button").removeClass("active");
  $(this).addClass("active");
  draw_chart_edad(
    "container_fallecidos",
    "https://raw.githubusercontent.com/annaabsi/git-scraper-vacunacion/main/resultados/fallecidos_edad.csv",
    3
  );
});

$("#mayor_80").click(function () {
  $(".button").removeClass("active");
  $(this).addClass("active");
  draw_chart_edad(
    "container_fallecidos",
    "https://raw.githubusercontent.com/annaabsi/git-scraper-vacunacion/main/resultados/fallecidos_edad.csv",
    4
  );
});
function draw_chart(container, url) {
  Highcharts.chart(container, {
    chart: {
      type: "line",
      zoomType: "x",
      resetZoomButton: {
        position: {
          // align: 'right', // by default
          // verticalAlign: 'top', // by default
          x: 0,
          y: -50,
        },
      },
      panning: true,
      panKey: "shift",
    },
    caption: {
      text: "Esta gráfica permite conocer los resultados día por día. Selecciona parte de la gráfica según el rango de fechas que quieres conocer.",
    },
    title: {
      text: "Personas fallecidas (2019-2021)",
    },

    subtitle: {
      text: "Fuente: SINADEF",
    },

    data: {
      csvURL: url,
      enablePolling: true,
    },
    series: [{}],
    xAxis: {
      type: "datetime",
      title: {
        text: "Fecha",
      },
    },
    yAxis: {
      title: {
        text: "Cantidad",
      },
    },
    annotations: [
      {
        draggable: "",
        labelOptions: {
          shape: "connector",
          align: "right",
          justify: true,
          crop: true,
          style: {
            fontSize: "0.8em",
            textOutline: "1px white",
          },
        },
        labels: [
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: "1584316800000",
              y: 324,
            },
            text: "Inicia cuarentena",
          },
        ],
      },
      {
        draggable: "",
        labels: [
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: "1618531200000",
              y: 1213,
            },
            text: "Comenzó vacunación <br> a mayores de 80 años",
          },
        ],
      },
      {
        draggable: "",
        labelOptions: {
          shape: "connector",
          align: "right",
          justify: true,
          crop: true,
          style: {
            fontSize: "0.8em",
            textOutline: "1px white",
          },
        },
        labels: [
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: "1610409600000",
              y: 599,
            },
            text: "Segunda ola",
          },
        ],
      },
    ],
    tooltip: {
      headerFormat: "Fallecidos: {point.y:.1f} personas<br>",
      pointFormat: "{point.x} ",
      shared: false,
      pointFormatter: function () {
        return (
          Highcharts.dateFormat("%a %d %b %Y", this.x) +
          "<br>" +
          "Año: " +
          this.series.name
        );
        // console.log(Highcharts.dateFormat("%a %d %b %Y", this.x), this.x);
      },
    },
  });
}

function draw_chart_edad(container, url, etapa) {
  Highcharts.chart(container, {
    chart: {
      animation: false,
      type: "line",
      zoomType: "x",
      resetZoomButton: {
        position: {
          // align: 'right', // by default
          // verticalAlign: 'top', // by default
          x: 0,
          y: -50,
        },
      },
      panning: true,
      panKey: "shift",
      events: {
        load: function (event) {
          //alert("Chart loaded");
          this.series.forEach(function (d, i) {
            if (d.options.id != etapa) d.hide();
          });
        },
      },
    },
    colors: ["#ffa600"],
    caption: {
      text: "Esta gráfica permite conocer los resultados día por día. Selecciona parte de la gráfica según el rango de fechas que quieres conocer.",
    },
    title: {
      text: "Personas fallecidas por edad (2019-2021)",
    },
    legend: {
      enabled: false,
    },
    subtitle: {
      text: "Fuente: SINADEF",
    },

    data: {
      csvURL: url,
      enablePolling: true,
    },
    series: [
      {
        id: "1",
        name: "17-59",
      },
      {
        id: "2",
        name: "60-69",
      },
      {
        id: "3",
        name: "70-79",
      },
      {
        id: "4",
        name: "80+",
      },
    ],
    xAxis: {
      type: "datetime",
      title: {
        text: "Fecha",
      },
    },
    yAxis: {
      title: {
        text: "Cantidad",
      },
    },
    tooltip: {
      headerFormat: "Fallecidos: {point.y:.1f} personas<br>",
      pointFormat: "{point.x} ",
      shared: false,
      pointFormatter: function () {
        //console.log(this.x)
        return (
          Highcharts.dateFormat("%a %d %b %Y", this.x) +
          "<br>" +
          "Edad: " +
          this.series.name
        );
        //console.log(Highcharts.dateFormat("%a %d %b %Y", this.x), this.x);
      },
    },
  });
}
