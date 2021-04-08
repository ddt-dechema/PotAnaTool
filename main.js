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

const WindOnCheck = document.getElementById('WindOnCheck');
const WindOffCheck = document.getElementById('WindOffCheck');
const PVCheck = document.getElementById('PVCheck');
const HydroCheck = document.getElementById('HydroCheck');
const BiomassCheck = document.getElementById('BiomassCheck');
const GeothermalCheck = document.getElementById('GeothermalCheck');
const GasEnergyCheck = document.getElementById('GasEnergyCheck');
const nonEECheck = document.getElementById('nonEECheck');
const GrossConsumptionCheck = document.getElementById('GrossConsumptionCheck');


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

var Energy_array=[
  "WindOn",
  "WindOff",
  "PV",
  "Hydro",
  "Biomass",
  "Geothermal",
  "GasEnergy",
  "nonEE",
  "GrossConsumption"
];
const Energy_array_input=[
  "WindOn_input",
  "WindOff_input",
  "PV_input",
  "Hydro_input",
  "Biomass_input",
  "Geothermal_input",
  "GasEnergy_input",
  "nonEE_input",
  "GrossConsumption_input"
];
const Energy_array_DEU_TWh=[
  "WindOn_DEU_TWh",
  "WindOff_DEU_TWh",
  "PV_DEU_TWh",
  "Hydro_DEU_TWh",
  "Biomass_DEU_TWh",
  "Geothermal_DEU_TWh",
  "GasEnergy_DEU_TWh",
  "nonEE_DEU_TWh",
  "GrossConsumption_DEU_TWh"
];

let OutputPtX=document.getElementById("EnergyOutput_input").value ;
let Electrolysis_input_curr=0;
let PtXOthers_input=0;

let TotalTWh_allyears=[];
let TotalTWh_peryear=[];

////////////////////////////////
//
//  CO2 DEU
//
////////////////////////////////
const CO2_chemical_kt = [29.793,	24.132,	19.068,	11.619];
const CO2_energy_kt = [305.109,	175.000,	45.766,	45.766];
const CO2_metal_kt = [34.888,	27.594,	22.057,	16.520];
const CO2_paper_kt = [7.816,	5.211,	2.605,	0];
const CO2_water_kt = [21.270,	16.213,	11.157,	6.100];
const CO2_minerals_kt = [29.604,	20.736,	11.868,	3.000];

const CO2_bio_etoh_kt = [820,570,	790,	500];
const CO2_bio_gas_kt = [3.700,	2.100,	2.600,	3.800];



let TotalTWh_curr=document.getElementById("TotalEnergy_input").value 
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
//  CO2 capture
//
////////////////////////////////
const DAC_TWh= [800,400,400,365]; // in [kWh/t CO2]; Climeworks data - secret!
const point_sources_TWh= [342,  328,  265,  294  ]; // mean of all sources
const biogenic_TWh= [111, 194]; // NOT IN YEARS!!! first is for Bioethanol, second for Biogas


////////////////////////////////
//
//  basic functions
//
////////////////////////////////

//  show, that other countries and PtX-products are not implemented yet
inputPtXProduct.addEventListener ("change", function () {
    // console.log(this.value);
    switch (this.value) {
    case 'Hydrogen':
      $('.tr-results').removeClass('table-success');      
      $('.tr-results').addClass('table-danger');  
      $('#table-calculations').removeClass('table-danger');
      $('#tr-results-hydrogen').removeClass('table-danger');  
      $('#tr-results-hydrogen').addClass('table-success');
      break;
    default:
      $('.tr-results').removeClass('table-success');    
      $('.tr-results').addClass('table-danger');  
      $('#table-calculations').addClass('table-danger');
        break;
    };
});
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
let tab_pointsources = document.getElementById('tab_pointsources');
let tab_DAC = document.getElementById('tab_DAC');
let tab_biogenic = document.getElementById('tab_biogenic');

let CO2sources = document.getElementById('CO2sources');
    CO2sources.addEventListener ("change", function () {
    // console.log(this.value);
    switch (this.value) {
    case 'point_sources':
        tab_pointsources.classList.remove("alert-secondary");
        tab_DAC.classList.remove("alert-secondary");
        tab_biogenic.classList.remove("alert-secondary");
        tab_pointsources.classList.add("alert-secondary");
        $('#table-calculations').removeClass('table-danger');

        break;
    case 'DAC':
        tab_pointsources.classList.remove("alert-secondary");
        tab_DAC.classList.remove("alert-secondary");
        tab_biogenic.classList.remove("alert-secondary");
        tab_DAC.classList.add("alert-secondary");
        $('#table-calculations').addClass('table-danger');
        break;
    case 'biogenic':
        tab_pointsources.classList.remove("alert-secondary");
        tab_DAC.classList.remove("alert-secondary");
        tab_biogenic.classList.remove("alert-secondary");
        tab_biogenic.classList.add("alert-secondary");
        $('#table-calculations').addClass('table-danger');
        break;
    default:
        break;
    };
});

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

////////////////////
//
//  REFACTOR!!!
//
////////////////////
//  update information on change

inputCountry.addEventListener ("change", function () {
    inputCountry_val=inputCountry.value;  
    calc_energy_allyears();
// console.log(inputCountry_val + inputPtXProduct_val + inputYear_val + SuppDemand_val);
});
inputPtXProduct.addEventListener ("change", function () {
    inputPtXProduct_val=inputPtXProduct.value;  
    calc_energy_allyears();
// console.log(inputCountry_val + inputPtXProduct_val + inputYear_val + SuppDemand_val);
});
inputYear.addEventListener ("change", function () {
    inputYear_val=inputYear.value;  
    calc_energy_allyears();
// console.log(inputCountry_val + inputPtXProduct_val + inputYear_val + SuppDemand_val);
});
// falls es mal mit jquery funktionieren soll
//  $('#inputYear').change(function(){
//     // alert($(this).val());
//     inputYear_val=$(this).val();  
//     console.log(inputYear_val)
//  })


////////////////////
//
//  REFACTOR!!!
//
////////////////////
//  update electricity output on change
WindOnCheck.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    document.getElementById("WindOn_input").value = WindOn_DEU_TWh[inputYear_val];
    document.getElementById("WindOn_input").classList.remove("alert-danger");
  } else {
    document.getElementById("WindOn_input").value = "0";
    document.getElementById("WindOn_input").classList.add("alert-danger");
  }
  calc_TotalTWh_curr();
});
WindOffCheck.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      document.getElementById("WindOff_input").value = WindOff_DEU_TWh[inputYear_val];
      document.getElementById("WindOff_input").classList.remove("alert-danger");
    } else {
      document.getElementById("WindOff_input").value = "0";
      document.getElementById("WindOff_input").classList.add("alert-danger");
    }
    calc_TotalTWh_curr();
});
PVCheck.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    document.getElementById("PV_input").value = PV_DEU_TWh[inputYear_val];
    document.getElementById("PV_input").classList.remove("alert-danger");
  } else {
    document.getElementById("PV_input").value = "0";
    document.getElementById("PV_input").classList.add("alert-danger");
  }
  calc_TotalTWh_curr();
});
HydroCheck.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      document.getElementById("Hydro_input").value = Hydro_DEU_TWh[inputYear_val];
      document.getElementById("Hydro_input").classList.remove("alert-danger");
    } else {
      document.getElementById("Hydro_input").value = "0";
      document.getElementById("Hydro_input").classList.add("alert-danger");
    }
    calc_TotalTWh_curr();
});
BiomassCheck.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      document.getElementById("Biomass_input").value = Biomass_DEU_TWh[inputYear_val];
      document.getElementById("Biomass_input").classList.remove("alert-danger");
    } else {
      document.getElementById("Biomass_input").value = "0";
      document.getElementById("Biomass_input").classList.add("alert-danger");
    }
    calc_TotalTWh_curr();
});
GeothermalCheck.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    document.getElementById("Geothermal_input").value = Geothermal_DEU_TWh[inputYear_val];
    document.getElementById("Geothermal_input").classList.remove("alert-danger");
  } else {
    document.getElementById("Geothermal_input").value = "0";
    document.getElementById("Geothermal_input").classList.add("alert-danger");
  }
  calc_TotalTWh_curr();
});
GasEnergyCheck.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      document.getElementById("GasEnergy_input").value = GasEnergy_DEU_TWh[inputYear_val];
      document.getElementById("GasEnergy_input").classList.remove("alert-danger");
    } else {
      document.getElementById("GasEnergy_input").value = "0";
      document.getElementById("GasEnergy_input").classList.add("alert-danger");
    }
    calc_TotalTWh_curr();
});
nonEECheck.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      document.getElementById("nonEE_input").value = nonEE_DEU_TWh[inputYear_val];
      document.getElementById("nonEE_input").classList.remove("alert-danger");
    } else {
      document.getElementById("nonEE_input").value = "0";
      document.getElementById("nonEE_input").classList.add("alert-danger");
    }
    calc_TotalTWh_curr();
});
GrossConsumptionCheck.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      document.getElementById("GrossConsumption_input").value = GrossConsumption_DEU_TWh[inputYear_val];
      document.getElementById("GrossConsumption_input").classList.remove("alert-danger");
    } else {
      document.getElementById("GrossConsumption_input").value = "0";
      document.getElementById("GrossConsumption_input").classList.add("alert-danger");
    }
    calc_TotalTWh_curr();
    $( "#GrossConsumption_input" ).effect( "highlight", {}, 1000);
    $( "#TotalEnergy_input" ).effect( "highlight", {}, 1000);
    $( "#Electrolysis_input" ).effect( "highlight", {}, 1000);
});

EnergyOutput_input.addEventListener('change', (event) => {
 calc_TotalTWh_curr();


});

// PtXOutput.addEventListener('change', (event) => {
//   calc_TotalTWh_curr();
//  });
function updateTextInput(val) {
  document.getElementById('EnergyOutput_input').value=val; 
  $( "#PtXOthers_input" ).effect( "highlight", {}, 1000);
  $( "#Electrolysis_input" ).effect( "highlight", {}, 1000);
 calc_TotalTWh_curr();
}

// function update_TWh(){
//   for (var i = 0, l = Energy_array.length; i < l; i++) {
//     var check= Energy_array[i]+'Check';
//     var item= Energy_array_input[i];
//     if ($('#'+check).is(':checked')) {
//       var input_value= eval(Energy_array_DEU_TWh[i])[inputYear_val];
//       // console.log(check, item, input_value);
//       $('#'+item).val(input_value);
//     } else  {
//       // console.log(check+' nö',item, input_value);
//       $('#'+item).val(0);
//     }
//   };
//   calc_energy_allyears();
// };

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
  
  TotalTWh_peryear=[];
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


function calc_TotalTWh_curr() {

  // current (!) Total TWh
  TotalTWh_curr=parseFloat($('#WindOn_input').val())+
  parseFloat($('#WindOff_input').val())+
  parseFloat($('#PV_input').val())+
  parseFloat($('#Hydro_input').val())+
  parseFloat($('#Biomass_input').val())+
  parseFloat($('#Geothermal_input').val())+
  parseFloat($('#GasEnergy_input').val())+
  parseFloat($('#nonEE_input').val())-
  parseFloat($('#GrossConsumption_input').val());
  
  TotalTWh_curr=TotalTWh_curr.toFixed(3);

  if(TotalTWh_curr<0) {
      TotalTWh_curr=0;
  };
  $('#TotalEnergy_input').val(TotalTWh_curr);

  OutputPtX=$('#EnergyOutput_input').val()/100; // Schieberegler!

  // Prozentualer Anteil für ausgewähltes PtX-Produkt
  Electrolysis_input_peryear=[];
  $.each(TotalTWh_peryear, function(index, value) {
    Electrolysis_input_peryear[index] = value * OutputPtX;
  });

  Electrolysis_input_curr = TotalTWh_curr*OutputPtX;
  PtXOthers_input = TotalTWh_curr*(1-OutputPtX);
  $('#Electrolysis_input').val(Electrolysis_input_curr.toFixed(3));
  $('#PtXOthers_input').val(PtXOthers_input.toFixed(3));
  
  calc_Hydrogen();
  //
  // und andere PtX Produkte
  //
};

////////////////////
//
//  calculate Hydrogen output
//
////////////////////

function calc_Hydrogen() {
  hydrogen_total_allyears=[];
  $.each(Electrolysis_input_peryear, function(index, value) {
    hydrogen_total_allyears[index] = (value / Electrolysis_TWh[index]).toFixed(3);
  });
  
  // H2_val=(Electrolysis_input_curr/Electrolysis_TWh[inputYear_val]).toFixed(3);
  H2O_val=(hydrogen_total_allyears[inputYear_val]*Electrolysis_H2O[inputYear_val]).toFixed(3);
  H2O_percentage=(H2O_val/Water_DEU*100).toFixed(3)+"%";
  

  // document.getElementById("H2_result").value = hydrogen_total_allyears[inputYear_val];
  // document.getElementById("H2_calc_input").value = hydrogen_total_allyears[inputYear_val];
  $('#H2_result, #H2_calc_input').val(hydrogen_total_allyears[inputYear_val]);

  // document.getElementById("H2O_input").value = H2O_val;
  // document.getElementById("H2O_total_input").value = H2O_val;
  $('#H2O_input, #H2O_total_input').val(H2O_val);

  // document.getElementById("H2O_total_percentage").value = H2O_percentage;
  $('#H2O_total_percentage').val(H2O_percentage);

  // Run the effect
  if($('#inputPtXProduct').val()=="Hydrogen"){
    $( "#H2_calc_input" ).effect( "highlight", {}, 1000);
    $( "#H2O_input" ).effect( "highlight", {}, 1000);
    $( "#H2O_total_input" ).effect( "highlight", {}, 1000);
    $( "#H2O_total_percentage" ).effect( "highlight", {}, 1000);
    $( "#H2_result" ).effect( "highlight", {}, 1000);
  }
};

////////////////////
//
//  Ergebnisse für alle Jahre zwischenspeichern
//
////////////////////

// Doughnot- or Pie-Chart for Energy
// vertical bar chart for output (demand/supply)




$(document).ready(function() {
  // $( "#H2_result" ).effect( "highlight", {}, 500);

});