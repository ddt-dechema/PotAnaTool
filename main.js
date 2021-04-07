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
const Gas_DEU_TWh=[0,0,0,0];
const nonEE_DEU_TWh=[294,41,31,0];
const GrossConsumption_DEU_TWh=[476,471.2218458,651.5729572,796.2533924];

// let TotalTWh=0;
let TotalTWh=document.getElementById("TotalEnergy_input").value 
////////////////////////////////
//
//  Elektrolyse - nur PEM!!!
//
////////////////////////////////
const Electrolysis_TWh= [49,46,45,43];
const Electrolysis_H2O= [11,11,11,11];

let H2_val= 0;
let H2O_val = 0;

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
        $('#tr-results-hydrogen').addClass('table-success');
        $('#table-calculations').removeClass('table-danger');
        break;
    default:
        $('#tr-results-hydrogen').removeClass('table-success');
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

//  update information on change
////////////////////
//
//  REFACTOR!!!
//
////////////////////
inputCountry.addEventListener ("change", function () {
    inputCountry_val=inputCountry.value;  
// console.log(inputCountry_val + inputPtXProduct_val + inputYear_val + SuppDemand_val);
});
inputPtXProduct.addEventListener ("change", function () {
    inputPtXProduct_val=inputPtXProduct.value;  
// console.log(inputCountry_val + inputPtXProduct_val + inputYear_val + SuppDemand_val);
});
inputYear.addEventListener ("change", function () {
    inputYear_val=inputYear.value;  
// console.log(inputCountry_val + inputPtXProduct_val + inputYear_val + SuppDemand_val);
});
// falls es mal mit jquery funktionieren soll
//  $('#inputYear').change(function(){
//     // alert($(this).val());
//     inputYear_val=$(this).val();  
//     console.log(inputYear_val)
//  })


//  update electricity output on change
////////////////////
//
//  REFACTOR!!!
//
////////////////////
WindOnCheck.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    document.getElementById("WindOn_input").value = WindOn_DEU_TWh[inputYear_val];
    document.getElementById("WindOn_input").classList.remove("alert-danger");
  } else {
    document.getElementById("WindOn_input").value = "0";
    document.getElementById("WindOn_input").classList.add("alert-danger");
  }
  calc_TotalTWh();
});
WindOffCheck.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      document.getElementById("WindOff_input").value = WindOff_DEU_TWh[inputYear_val];
      document.getElementById("WindOff_input").classList.remove("alert-danger");
    } else {
      document.getElementById("WindOff_input").value = "0";
      document.getElementById("WindOff_input").classList.add("alert-danger");
    }
    calc_TotalTWh();
});
PVCheck.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    document.getElementById("PV_input").value = PV_DEU_TWh[inputYear_val];
    document.getElementById("PV_input").classList.remove("alert-danger");
  } else {
    document.getElementById("PV_input").value = "0";
    document.getElementById("PV_input").classList.add("alert-danger");
  }
  calc_TotalTWh();
});
HydroCheck.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      document.getElementById("Hydro_input").value = Hydro_DEU_TWh[inputYear_val];
      document.getElementById("Hydro_input").classList.remove("alert-danger");
    } else {
      document.getElementById("Hydro_input").value = "0";
      document.getElementById("Hydro_input").classList.add("alert-danger");
    }
    calc_TotalTWh();
});
BiomassCheck.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      document.getElementById("Biomass_input").value = Biomass_DEU_TWh[inputYear_val];
      document.getElementById("Biomass_input").classList.remove("alert-danger");
    } else {
      document.getElementById("Biomass_input").value = "0";
      document.getElementById("Biomass_input").classList.add("alert-danger");
    }
    calc_TotalTWh();
});
GeothermalCheck.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    document.getElementById("Geothermal_input").value = Geothermal_DEU_TWh[inputYear_val];
    document.getElementById("Geothermal_input").classList.remove("alert-danger");
  } else {
    document.getElementById("Geothermal_input").value = "0";
    document.getElementById("Geothermal_input").classList.add("alert-danger");
  }
  calc_TotalTWh();
});
GasEnergyCheck.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      document.getElementById("Gas_input").value = Gas_DEU_TWh[inputYear_val];
      document.getElementById("Gas_input").classList.remove("alert-danger");
    } else {
      document.getElementById("Gas_input").value = "0";
      document.getElementById("Gas_input").classList.add("alert-danger");
    }
    calc_TotalTWh();
});
nonEECheck.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      document.getElementById("nonEE_input").value = nonEE_DEU_TWh[inputYear_val];
      document.getElementById("nonEE_input").classList.remove("alert-danger");
    } else {
      document.getElementById("nonEE_input").value = "0";
      document.getElementById("nonEE_input").classList.add("alert-danger");
    }
    calc_TotalTWh();
});
GrossConsumptionCheck.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      document.getElementById("GrossConsumption_input").value = GrossConsumption_DEU_TWh[inputYear_val];
      document.getElementById("GrossConsumption_input").classList.remove("alert-danger");
    } else {
      document.getElementById("GrossConsumption_input").value = "0";
      document.getElementById("GrossConsumption_input").classList.add("alert-danger");
    }
    calc_TotalTWh();
});

function calc_TotalTWh() {
    TotalTWh=parseFloat($('#WindOn_input').val())+
    parseFloat($('#WindOff_input').val())+
    parseFloat($('#PV_input').val())+
    parseFloat($('#Hydro_input').val())+
    parseFloat($('#Biomass_input').val())+
    parseFloat($('#Geothermal_input').val())+
    parseFloat($('#Gas_input').val())+
    parseFloat($('#nonEE_input').val())-
    parseFloat($('#GrossConsumption_input').val());
    
    if(TotalTWh<0) {
        TotalTWh=0;
    };

    document.getElementById("TotalEnergy_input").value = TotalTWh;
    document.getElementById("Electrolysis_input").value = TotalTWh;
    calc_Hydrogen();
};

////////////////////
//
//  calculate Hydrogen output
//
////////////////////

function calc_Hydrogen() {
    H2_val=TotalTWh/Electrolysis_TWh[inputYear_val];
    H2O_val=H2_val*Electrolysis_H2O[inputYear_val];
    H2O_percentage=H2O_val/Water_DEU*100;
    H2O_percentage=parseFloat(H2O_percentage).toFixed(3)+"%";

    document.getElementById("H2_result").value = H2_val;
    document.getElementById("H2O_input").value = H2O_val;
    document.getElementById("H2O_total_input").value = H2O_val;
    document.getElementById("H2O_total_percentage").value = H2O_percentage;
};