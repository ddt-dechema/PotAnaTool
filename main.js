// var a;                          // variable
// var b = "init";                 // string
// var c = "Hi" + " " + "Joe";     // = "Hi Joe"
// var d = 1 + 2 + "3";            // = "33"
// var e = [2,3,5,8];              // array
// var f = false;                  // boolean
// var g = /()/;                   // RegEx
// var h = function(){};           // function object
// const PI = 3.14;                // constant
// var a = 1, b = 2, c = a + b;    // one line
// let z = 'zzz';                  // block scope local variable


////////////////////////////////
//
//  Global variables
//
////////////////////////////////
const years=[2020,2030,2040,2050];
const Water_DEU=119000;
/*
const PtX_Products =[];
const country = [];
*/
let inputCountry = document.getElementById('inputCountry');
let inputPtXProduct = document.getElementById('inputPtXProduct');
let inputYear = document.getElementById('inputYear');

let inputCountry_val = 0;
let inputPtXProduct_val = 0;
let inputYear_val = 0;
let SuppDemand_val = 0;
let DemandRadio_val =0;

inputCountry_val = inputCountry.value;
inputPtXProduct_val = inputPtXProduct.value;
inputYear_val=inputYear.value;

//  
// const WindOnCheck = document.getElementById('WindOnCheck');
// const WindOffCheck = document.getElementById('WindOffCheck');
// const PVCheck = document.getElementById('PVCheck');
// const HydroCheck = document.getElementById('HydroCheck');
// const BiomassCheck = document.getElementById('BiomassCheck');
// const GeothermalCheck = document.getElementById('GeothermalCheck');
// const GasEnergyCheck = document.getElementById('GasEnergyCheck');
// const nonEECheck = document.getElementById('nonEECheck');
// const GrossConsumptionCheck = document.getElementById('GrossConsumptionCheck');


////////////////////////////////
//
//  Strom DEU
//
////////////////////////////////
const WindOn_DEU_TWh= [140,243,439,439];
const WindOff_DEU_TWh=[22,22,161,267];
const PV_DEU_TWh =[56,72,227,431];
const Hydro_DEU_TWh=[14,14,14,14];
const Biomass_DEU_TWh=[44,21,21,21];
const Geothermal_DEU_TWh =[0,18,18,18];
const GasEnergy_DEU_TWh=[0,0,0,0];
const nonEE_DEU_TWh=[294,41,31,0];
const GrossConsumption_DEU_TWh=[476,471.2218458,651.5729572,796.2533924];

const Energy_array=[  "WindOn",  "WindOff",  "PV",  "Hydro",  "Biomass",  "Geothermal",  "GasEnergy",  "nonEE",  "GrossConsumption"];
const Energy_array_label=[  "WindOn",  "WindOff",  "PV",  "Hydro",  "Biomass",  "Geothermal",  "GasEnergy",  "nonEE"];
const Energy_array_input=[  "WindOn_input",  "WindOff_input",  "PV_input",  "Hydro_input",  "Biomass_input",  "Geothermal_input",  "GasEnergy_input",  "nonEE_input",  "GrossConsumption_input"];
const Energy_array_DEU_TWh=[  "WindOn_DEU_TWh",  "WindOff_DEU_TWh",  "PV_DEU_TWh",  "Hydro_DEU_TWh",  "Biomass_DEU_TWh",  "Geothermal_DEU_TWh",  "GasEnergy_DEU_TWh",  "nonEE_DEU_TWh",  "GrossConsumption_DEU_TWh"];

let OutputPtX_percentage=document.getElementById("EnergyOutput_input").value ;
let Electrolysis_input_curr=0;
let PtXOthers_input=0;

let TotalTWh_allyears=[];   //  alle Jahre, alle Technologien einzeln aufgelistet
let TotalTWh_curr_arr = []; //  aktuelles Jahr, alle Technologien einzeln aufgelistet
let TotalTWh_peryear=[];    //  alle Jahre, summierte Technologien
let TotalTWh_curr = 0;      //  aktuelles Jahr, summierte Technologien

////////////////////////////////
//
//  CO2 DEU
//
////////////////////////////////
const ChemistrySectorCheck_kt = [29.793,	24.132,	19.068,	11.619];
const EnergySectorCheck_kt = [305.109,	175.000,	45.766,	45.766];
const MetalSectorCheck_kt = [34.888,	27.594,	22.057,	16.520];
const PaperSectorCheck_kt = [7.816,	5.211,	2.605,	0];
const WaterSectorCheck_kt = [21.270,	16.213,	11.157,	6.100];
const MineralSectorCheck_kt = [29.604,	20.736,	11.868,	3.000];

const CO2_array = [  "ChemistrySectorCheck",  "EnergySectorCheck",  "MetalSectorCheck",  "PaperSectorCheck",  "WaterSectorCheck",  "MineralSectorCheck"];

const CO2_bio_etoh_Mt = [0.820, 0.570,	0.790,	0.500];
const CO2_bio_gas_Mt = [3.700,	2.100,	2.600,	3.800];

// FT Diesel-Benzin; Methanol; OME3-5, DMC
const CO2_DAC_energy_percentage= [
  [0.10608,	0.05937,	0.06111,	0.05777], // FT Diesel Benzin
  [0.10608,	0.05937,	0.06111,	0.05777], // FT-Kerosene
  [0.10608,	0.05937,	0.06111,	0.05777], // FT-Naphtha
  [0.10675,	0.05977,	0.06152,	0.05815], // Methanol
  [0.10675,	0.05977,	0.06152,	0.05815]  // OME3-5
];

const CO2_pointsources_energy_percentage = [        
  [0.04830,	0.04925,	0.04080,	0.02900], // FT Diesel Benzin
  [0.04895,	0.04895,	0.04895,	0.04895], // FT-Kerosene
  [0.04895,	0.04895,	0.04895,	0.04895], // FT-Naphtha
  [0.04863,	0.04958,	0.03400,	0.02100], // Methanol
  [0.04863,	0.04958,	0.03400,	0.02100]  // OME3-5
];

const CO2_biogenic_energy_percentage = [       
  [0.00180,	0.00180,	0.00180,	0.00180], // FT Diesel Benzin
  [0.00180,	0.00180,	0.00180,	0.00180], // FT-Kerosene
  [0.00180,	0.00180,	0.00180,	0.00180], // FT-Naphtha
  [0.00190,	0.00190,	0.00190,	0.00190], // Methanol
  [0.00190,	0.00190,	0.00190,	0.00190]  // OME3-5
];

let CO2_TWh_input_peryear = [];
let CO2_input_peryear = [];
let Total_CO2_allyears_point_sources=[];  // hängt von den gewählten Einstellungen ab
// let Total_CO2_allyears_biogenic=[];    // gibts nicht, weil die Auswahlmöglichkeiten nicht angeboten werden
let Total_CO2_peryear_point_sources=[]; 
let Total_CO2_peryear_biogenic=[];

let Total_CO2_real_peryear=[];  // der Wert, mit dem tatsächlich weitergerechnet wird
////////////////////////////////
//
//  Elektrolyse - nur PEM!!!
//
////////////////////////////////
const Electrolysis_TWh= [49,46,45,43];
const Electrolysis_H2O= [11,11,11,11];

let H2_val= 0;
let H2O_val = 0;

let hydrogen_total_allyears=[];

////////////////////////////////
//
//  CO2 capture - energy consumption
//
////////////////////////////////
const DAC_TWh= [800,400,400,365]; // in [kWh/t CO2]; Climeworks data - secret!
const point_sources_TWh= [342,  328,  265,  294  ]; // mean of all sources
const biogenic_TWh= [153, 153, 153, 1153]; // Mittelwert; auf alle Jahre extrapoliert
const biogenic_TWh_einzeln= [111, 194]; //  first is for Bioethanol, second for Biogas

////////////////////////////////
//
//  basic functions
//
////////////////////////////////

inputCountry.addEventListener ("change", function () {
  // console.log(this.value);
  switch (this.value) {
  case 'Germany':
      $('#table-calculations').removeClass('table-danger');
      break;
  default:
      $('#table-calculations').addClass('table-danger');
      break;
  };
});

//  change tabs of CO2 sources
// let tab_pointsources = document.getElementById('tab_pointsources');
// let tab_DAC = document.getElementById('tab_DAC');
// let tab_biogenic = document.getElementById('tab_biogenic');

let CO2sources = $('#CO2sources').val();

$('#CO2sources').change(function() {
// console.log(this.value);
  CO2sources=$('#CO2sources').val();
  $('#tab_point_sources, #tab_DAC, #tab_biogenic').removeClass("alert-secondary");
  $('#tab_'+this.value).addClass("alert-secondary");
  calc_energy_allyears();
});

////////////////////////////////
//
//  General settings
//
////////////////////////////////

//  update information on change
//  show, that other countries and PtX-products are not implemented yet
inputPtXProduct.addEventListener ("change", function () {
  // $('#inputPtXProduct').change(function(){
  inputPtXProduct_val=$(this).val();  
  $('.div-result').removeClass('alert-success');
  $('#div-'+$('#inputPtXProduct').val()+'_result').addClass('alert-success');
  

  $('#table-calculations').addClass('table-danger');
  // console.log(this.value);
  switch (this.value) {
  case 'Hydrogen':
  case "MeOH":
  // case "OME":
  
    // $('.tr-results').addClass('table-danger');  
    $('#table-calculations').removeClass('table-danger');
      break;
  default:
    // $('#table-calculations').addClass('table-danger');
      break;
  };

  calc_energy_allyears();  
});

$('#inputCountry').change(function(){
  // alert($(this).val());
  inputCountry_val=$(this).val();  
  calc_energy_allyears();  
}) 
$('#inputYear').change(function(){
  // alert($(this).val());
  inputYear_val=$(this).val();  
  calc_energy_allyears();
})

// noch nicht zu Ende eingebaut, da Berechnungen fehlen
// Angebot - Nachfrage
var rad = document.getElementsByName('SuppDemandRadios');
var prev = null;
for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
        // (prev) ? console.log(prev.value): null;
        if (this !== prev) {
            prev = this;
        }
        // console.log(this.value);
        SuppDemand_val=this.value;
    });
}

////////////////////////////////
//
//  Energy
//
////////////////////////////////

function updateTextInput(val) {
  document.getElementById('EnergyOutput_input').value=val; 
  $( "#PtXOthers_input" ).effect( "highlight", {}, 1000);
  $( "#Electrolysis_input" ).effect( "highlight", {}, 1000);
  calc_energy_allyears();
}

function calc_energy_allyears(){
  TotalTWh_allyears=[];   // alle Erzeungstechnologien und alle Jahre
  
  for (var i = 0, l = Energy_array.length-1; // damit gross consumption nicht mitgenommen wird
     i < l; i++) {
    var check= Energy_array[i]+'Check';
    var item= Energy_array_input[i];
    if ($('#'+check).is(':checked')) {
      var input_value= eval(Energy_array_DEU_TWh[i]);
      var input_value_curr= eval(Energy_array_DEU_TWh[i])[inputYear_val];
      // console.log(check, item, input_value);
      $('#'+item).val(input_value_curr);
      TotalTWh_allyears.push(input_value);
    } else  {
      // console.log(check+' nö',item, input_value);
      $('#'+item).val(0);
      TotalTWh_allyears.push([0,0,0,0]);
    }
  };
  
  TotalTWh_peryear=[]; // Summe aus allen Technologien und alle Jahre
  var count=0;
  for(var j=0, k=years.length; j < k; j++) {
    count = 0;
    for(var i=0, n=TotalTWh_allyears.length; i < n; i++) 
      { 
        count += TotalTWh_allyears[i][j]; // 0: Jahr 2020
      }
    TotalTWh_peryear.push(count);
  }
  
  calc_TotalTWh_curr();
  return TotalTWh_allyears;
};


////////////////////////////////
//
//  CO2 point sources
//
////////////////////////////////
function calc_CO2_point_allyears(){
  Total_CO2_allyears_point_sources=[];

  for (var i = 0; i < CO2_array.length; i++) {
    if ($('#'+CO2_array[i]).is(':checked')) {
      var input_value= eval(CO2_array[i]+"_kt");
      Total_CO2_allyears_point_sources.push(input_value);
    } else  {
      Total_CO2_allyears_point_sources.push([0,0,0,0]);
    }
  };
  
  Total_CO2_peryear_point_sources=[]; // Summe aus allen Technologien und alle Jahre
  var count=0;
  for(var j=0, k=years.length; j < k; j++) {
    count = 0;
    for(var i=0, n=Total_CO2_allyears_point_sources.length; i < n; i++) 
      { 
        count += Total_CO2_allyears_point_sources[i][j]; // 0: Jahr 2020
      }
      Total_CO2_peryear_point_sources.push(count);
  }
  
  // console.log(TotalCO2_point_allyears);
  // console.log(TotalCO2_point_peryear);
  return Total_CO2_allyears_point_sources;
};
////////////////////////////////
//
//  CO2 biogenic sources
//
////////////////////////////////
// keine Auswahlmöglichkeit
function calc_CO2_biogenic_allyears(){
  Total_CO2_peryear_biogenic=[]; // Summe alle Jahre
  
  for(let i=0, l=4; i<l; i++){
    Total_CO2_peryear_biogenic[i]= CO2_bio_etoh_Mt[i]+CO2_bio_gas_Mt[i];
  }
  return Total_CO2_peryear_biogenic;
};

////////////////////////////////
//
//  Energy distribution
//
////////////////////////////////

function calc_TotalTWh_curr() {
  // current (!) Total TWh
  TotalTWh_curr_arr = []; //  aktuelles Jahr, alle Technologien einzeln aufgelistet
  for(var i=0, n=TotalTWh_allyears.length; i < n; i++) 
  { 
    TotalTWh_curr_arr.push(TotalTWh_allyears[i][inputYear_val]); 
  }
  
  updateChart(EnergyChart, TotalTWh_curr_arr);

  // for index_old.html
  // TotalTWh_curr=parseFloat($('#WindOn_input').val())+
  // parseFloat($('#WindOff_input').val())+
  // parseFloat($('#PV_input').val())+
  // parseFloat($('#Hydro_input').val())+
  // parseFloat($('#Biomass_input').val())+
  // parseFloat($('#Geothermal_input').val())+
  // parseFloat($('#GasEnergy_input').val())+
  // parseFloat($('#nonEE_input').val())-
  // parseFloat($('#GrossConsumption_input').val());
  
  // Berechnung: aktuelles Jahr, summierte Technologien
  TotalTWh_curr = 0;
  $.each(TotalTWh_curr_arr, function(index, value) {
    TotalTWh_curr += value;
  });
  TotalTWh_curr=TotalTWh_curr.toFixed(3);
  if(TotalTWh_curr<0) {
      TotalTWh_curr=0;
  };
  $('#TotalEnergy_input').val(TotalTWh_curr);

  //Gross consumption ggf abziehen:
  TotalPtX_input=[];
  if($('#GrossConsumptionCheck').is(':checked')){
    $("#GrossConsumption_input").val(GrossConsumption_DEU_TWh[inputYear_val].toFixed(3));
    for(var i = 0;i<=GrossConsumption_DEU_TWh.length-1;i++)
      if(TotalTWh_peryear[i]>GrossConsumption_DEU_TWh[i]) {
        TotalPtX_input.push((TotalTWh_peryear[i] - GrossConsumption_DEU_TWh[i]).toFixed(3));
      } else {
        TotalPtX_input.push(0);
      }
  } else {
    $("#GrossConsumption_input").val(0);
    TotalPtX_input=TotalTWh_peryear;
  };

  // Prozentualer Anteil für ausgewähltes PtX-Produkt
  // bisher nur für Elektrolyse !!!
  OutputPtX_percentage=$('#EnergyOutput_input').val()/100; // Schieberegler!
  
  PtX_input_peryear=[];
  $.each(TotalPtX_input, function(index, value) {
    PtX_input_peryear[index] = value * OutputPtX_percentage;
  });

  //calculate and display for current year
  PtXOthers_input = TotalPtX_input[inputYear_val]-PtX_input_peryear[inputYear_val];
  $('#PtXOthers_input').val(PtXOthers_input.toFixed(3));

  calc_CO2_output();
};

////////////////////////////////////////
//
//  RESULTS
//
////////////////////////////////////////

////////////////////////////////////////
//
//  calculate CO2
//
////////////////////////////////////////
function calc_CO2_output() {
  
  $('.CO2_inputs,#CO2_TWh_input').val(0);  // alle Input-Felder auf 0 setzen
  
  // get percentage for selection
  CO2_percentage=[];
  var CO2_product_element = 0;
  CO2_TWh_input_peryear = [];

  switch (inputPtXProduct_val) {
    case "FT-Diesel":
    case "FT-Gasoline":
      CO2_product_element=0;        break;  
    case "FT-Kerosene":
      CO2_product_element=1;        break;
    case "FT-Naphtha":
      CO2_product_element=2;        break;
    case "MeOH":
      CO2_product_element=3;        break;
    case "OME":
      CO2_product_element=4;        break;
  }
  
  if(inputPtXProduct_val!="Hydrogen"){
    if($('#CO2sources').val()=="DAC"){
      CO2_percentage=CO2_DAC_energy_percentage[CO2_product_element];
    } else if($('#CO2sources').val()=="point_sources"){
      CO2_percentage=CO2_pointsources_energy_percentage[CO2_product_element];
    } else if($('#CO2sources').val()=="biogenic"){
      CO2_percentage=CO2_biogenic_energy_percentage[CO2_product_element];
    }

    for (let i = 0; i < CO2_percentage.length; i++) {
      CO2_TWh_input_peryear[i] = CO2_percentage[i] * PtX_input_peryear[i];
    }
    
    //vorläufige Berechnung des CO2-output in Mio.t
    CO2_input_peryear=[];
    for (let i = 0; i < CO2_TWh_input_peryear.length; i++) {
      CO2_input_peryear[i] =  CO2_TWh_input_peryear[i]*1000/eval($('#CO2sources').val()+"_TWh")[i];
    }
    
    // if output > "tatsächlich vorhanden" berücksichtigen!!!!
    if($('#CO2sources').val()=="biogenic" || $('#CO2sources').val()=="point_sources") {
      Total_CO2_real_peryear=[];
      
      for(let i=0; i<CO2_input_peryear.length; i++) {
        if(CO2_input_peryear[i]< eval("Total_CO2_peryear_" + CO2sources)[i]  ) {
          Total_CO2_real_peryear[i]=CO2_input_peryear[i];
        } else {
          Total_CO2_real_peryear[i]=eval("Total_CO2_peryear_" + CO2sources)[i];
          //Rückrechnung auf den eigentlichen Stromanteil!!!
          CO2_TWh_input_peryear[i]=Total_CO2_real_peryear[i]/1000*eval($('#CO2sources').val()+"_TWh")[i];
        }
      };

    }
     else{ // DAC !!!!!!
       hi="2";
     };
    //tatsächliche Berechnung des CO2-output in Mio.t

    // TotalCO2_point_peryear[i]

    $('#CO2_TWh_input').val((CO2_TWh_input_peryear[inputYear_val]).toFixed(3));
    
    $('#'+$('#CO2sources').val()+"_input").val((Total_CO2_real_peryear[inputYear_val]).toFixed(3));
    $('#CO2_input').val((Total_CO2_real_peryear[inputYear_val]).toFixed(3));
  
  } else { // wenn es Hydrogen ist
    hi="2";
  };
 
  calc_Hydrogen();
  return CO2_TWh_input_peryear;

};
////////////////////////////////////////
//
//  calculate Hydrogen output
//
////////////////////////////////////////

function calc_Hydrogen() {
  //  Strommenge, die für CO2 TATSÄCHLICH notwendig ist:
  CO2_TWh_input_peryear;

  //  Restmenge an Strom, die für Elektrolyse verbleibt
  Electrolysis_input_peryear=[];
  if(Array.isArray(CO2_TWh_input_peryear) && CO2_TWh_input_peryear.length>0) {
    for (let i = 0; i < CO2_TWh_input_peryear.length; i++) {
      Electrolysis_input_peryear[i] =  PtX_input_peryear[i]-CO2_TWh_input_peryear[i];
    }
  } else {
    Electrolysis_input_peryear=PtX_input_peryear;
  }
  
  //calculate and display for current year
  // Electrolysis_input_curr = TotalPtX_input[inputYear_val]*OutputPtX_percentage;
  // PtXOthers_input = TotalPtX_input[inputYear_val]*(1-OutputPtX_percentage);
  $('#Electrolysis_input').val((Electrolysis_input_peryear[inputYear_val]).toFixed(3));
  // $('#PtXOthers_input').val(PtXOthers_input.toFixed(3));

  hydrogen_total_allyears=[];
  $.each(Electrolysis_input_peryear, function(index, value) {
    hydrogen_total_allyears[index] = (value / Electrolysis_TWh[index]).toFixed(3);
  });
  
  H2O_val=(hydrogen_total_allyears[inputYear_val]*Electrolysis_H2O[inputYear_val]).toFixed(3);
  H2O_percentage=(H2O_val/Water_DEU*100).toFixed(3);
  
  
  //  Wasser
  $('#H2O_input, #H2O_total_input').val(H2O_val);
  $('#H2O_input, #H2O_total_input').val(H2O_val);
  $('#H2O_total_percentage').val(H2O_percentage);

  // wenn H2 auch ausgewählt wurde, dann auch im Results-Tab anzeigen
  if($('#inputPtXProduct').val()=="Hydrogen") {
    $('.results-input, .oxygenates').val(); // Resetten aller Felder
    $('.oxygenates').val(0);                //  alle Oxygenat-Kraftstoffe auf 0 setzen
    $('#H2_result,#H2_calc_input').val(hydrogen_total_allyears[inputYear_val]);
  } else {
    $('#H2_calc_input').val(hydrogen_total_allyears[inputYear_val]);
    $('#H2_result').val(0);
  }
  
  // Run the effect
  if($('#inputPtXProduct').val()=="Hydrogen"){
    $( "#H2_result" ).effect( "highlight", {}, 1000);
  } else {
  };

  $( "#H2_calc_input" ).effect( "highlight", {}, 1000);
  $( "#H2O_input" ).effect( "highlight", {}, 1000);
  $( "#H2O_total_input" ).effect( "highlight", {}, 1000);
  $( "#H2O_total_percentage" ).effect( "highlight", {}, 1000);
  
  // console.log(TotalTWh_peryear)
  updateChart(ResultsChart, hydrogen_total_allyears);
};




////////////////////////////////////////
//
//  Diagramme
//
////////////////////////////////////////

// Doughnot- or Pie-Chart for Energy
// vertical bar chart for output (demand/supply)
function updateChart(chart, data) {
  chart.data.datasets[0].data =data;
  chart.update();
}

var ctx = $('#ResultsChart');
var ctx_energy = $('#EnergyChart');

var ResultsChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: years,
      datasets: [{
          label: 'Total Hydrogen Output',  
          data: [ 14, 1, 2, 1 ],

          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              },
              scaleLabel : {
              display: true,
              labelString: 'Mio. t'
             } 
          }]
      }
      //,      showAllTooltips: true

  }
});

var EnergyChart = new Chart(ctx_energy, {
  type: 'doughnut',
  data: {
    labels: Energy_array_label,
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100, 50, 50, 50 ,50, 294],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(223, 224, 225, 1)',
        'rgba(0, 0, 0, 1)'
      ],
      hoverOffset: 4
    }]
  },
  options: {
      responsive: false,
      legend: {
          position: 'right' //,
          // labels: {
          //     fontColor: "white",
          //     boxWidth: 20,
          //     padding: 20
          // }
      }//,
      // showAllTooltips: true
  }
});

// Show tooltips always even the stats are zero
// https://stackoverflow.com/a/42272340
// add options: showAllTooltips: true

Chart.pluginService.register({
  beforeRender: function(chart) {
    if (chart.config.options.showAllTooltips) {
      // create an array of tooltips
      // we can't use the chart tooltip because there is only one tooltip per chart
      chart.pluginTooltips = [];
      chart.config.data.datasets.forEach(function(dataset, i) {
        chart.getDatasetMeta(i).data.forEach(function(sector, j) {
          chart.pluginTooltips.push(new Chart.Tooltip({
            _chart: chart.chart,
            _chartInstance: chart,
            _data: chart.data,
            _options: chart.options.tooltips,
            _active: [sector]
          }, chart));
        });
      });

      // turn off normal tooltips
      chart.options.tooltips.enabled = false;
    }
  },
  afterDraw: function(chart, easing) {
    if (chart.config.options.showAllTooltips) {
      // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
      if (!chart.allTooltipsOnce) {
        if (easing !== 1)
          return;
        chart.allTooltipsOnce = true;
      }

      // turn on tooltips
      chart.options.tooltips.enabled = true;
      Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
        tooltip.initialize();
        tooltip.update();
        // we don't actually need this since we are not animating tooltips
        tooltip.pivot();
        tooltip.transition(easing).draw();
      });
      chart.options.tooltips.enabled = false;
    }
  }
});

// document.addEventListener("DOMContentLoaded", event => {
//   calc_energy_allyears();
// });
  
$(document).ready(function() {
  calc_CO2_point_allyears();
  calc_CO2_biogenic_allyears();
  calc_energy_allyears();

  //  Strom - Auswahlboxen
  // WindOnCheck.addEventListener('change', (event) => {
  //   calc_energy_allyears();
  // });
  $('#EnergyOutput_input,#WindOnCheck,  #WindOffCheck,  #PVCheck,  #HydroCheck,  #BiomassCheck,  #GeothermalCheck,  #GasEnergyCheck,  #nonEECheck,  #GrossConsumptionCheck').change(function() {
    calc_energy_allyears();
  });
  // 
  //  CO2 - Auswahlboxen
  // 
  $('#ChemistrySectorCheck,#EnergySectorCheck,#MetalSectorCheck,#PaperSectorCheck,#WaterSectorCheck,#MineralSectorCheck').change(function() {
      calc_CO2_point_allyears();
  });
});
