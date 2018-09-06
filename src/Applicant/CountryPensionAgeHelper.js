import axios from 'axios';
import Moment from 'react-moment';
//Notification 
import Notifications, { notify } from 'react-notify-toast';
// promise method to call a new function with the response of the current method
var moment = require('moment');
export const SaveDataAPICallMailSend = function (mailSendURL, data) {
    var promise = new Promise(function (resolve, reject) {
        axios({
            method: "POST",
            url: mailSendURL,
            data: JSON.stringify(data),

        }).then(({ data }) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
    return promise;
}

export function getCurrentAge(user_age) {
    let cur_date = moment(new Date()).format('MM/DD/YYYY');
    let userCurrAgeInMonths = parseInt(moment(cur_date).diff(moment(new Date(user_age)), 'months'));
    let years = parseInt(userCurrAgeInMonths / 12);
    let months = userCurrAgeInMonths % 12;
    let currentAge = {
        currYear: years,
        currmonth: months
    }
    return currentAge;
}

// Retirement Age Eligibilty Check
export function allowToEditBeneficiaryQuestions(retireAge, currentAge) {
    let age = currentAge.currYear;
    let ageMonth = currentAge.currmonth;
    let eligible = false;
    if (retireAge.Month == 0) {
        if ((age < retireAge.Age)) {
            if (age == retireAge.Age - 1) {
                if (ageMonth > 8) {
                    eligible = true;
                } else {
                    eligible = false;
                }
            }
            else {
                eligible = false;
            }
        }
        else {
            eligible = true;
        }
    } else {
        if (age <= retireAge.Age) {
            if (age == retireAge.Age) {
                if (retireAge.Month == 1 && (age == retireAge.Age - 1) && ageMonth == 8) {
                    eligible = false;
                } else if (retireAge.Month == 2 && (age == retireAge.Age - 1) && ageMonth == 9) {
                    eligible = false;
                } else if (retireAge.Month == 3 && (age == retireAge.Age - 1) && ageMonth == 10) {
                    eligible = false;
                } else if (retireAge.Month == 4 && (age == retireAge.Age - 1) && ageMonth == 11) {
                    eligible = false;
                } else if (retireAge.Month == 5 && ageMonth == 1) {
                    eligible = false;
                } else if (retireAge.Month == 6 && ageMonth == 2) {
                    eligible = false;
                } else if (retireAge.Month == 7 && ageMonth == 3) {
                    eligible = false;
                } else if (retireAge.Month == 8 && ageMonth == 4) {
                    eligible = false;
                } else if (retireAge.Month == 9 && ageMonth == 5) {
                    eligible = false;
                } else if (retireAge.Month == 10 && ageMonth == 6) {
                    eligible = false;
                } else if (retireAge.Month == 11 && ageMonth == 7) {

                    eligible = false;
                }
                else {
                    eligible = true;
                }
            } else if (age == retireAge.Age - 1) {
                if (ageMonth >= 8) {
                    eligible = true;
                } else {

                    eligible = false;
                }
            }
            else {

                eligible = false;
            }
        } else {
            eligible = true;
        }
    }
    return eligible;
}



// Pension Age eligibilty for the German country 
export function handleGermanyAgeEligiblity(countryCode, userAge) {
    let dateOfBirth = new Date(userAge);
    let ageQueryAPI = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
    let inputParams = {
        QueryName: "getRetirementAge",
        CountryCode: countryCode,
        YearOfBirth: dateOfBirth.getFullYear()
    }
    let retireAge = "";
    let valid = false;
    SaveDataAPICallMailSend(ageQueryAPI, inputParams).then((data) => {
        data.map((item, key) => {
            retireAge = {
                Age: item.RetirementAge,
                Month: item.RetirementMonth,
                countryCode: item.CountryCode,
                country: "GERMANY"
            }
        })
        let currentAge = getCurrentAge(dateOfBirth);
        valid = allowToEditBeneficiaryQuestions(retireAge, currentAge);
    }).catch((err) => {
        console.log(err);
    });

    return valid;
}

// Austria country 
export function austriaCountry(gender) {
    let retireAge = {
        Age: (gender === 'M') ? 65 : 60,
        Month: 0,
        countryCode: "AT",
        country: "AUSTRIA"
    }
    return retireAge;
}

//Belgium country
export function belgiumCountry() {
    let retireAge = {
        Age: 65,
        Month: 0,
        countryCode: "BE",
        country: "BELGIUM"
    }
    return retireAge;
}

//Brazil  country
export function brazilCountry(gender) {
    let retireAge = {
        Age: (gender === 'M') ? 65 : 60,
        Month: 0,
        countryCode: "BR",
        country: "BRAZIL"
    }
    return retireAge;
}

//ireland  country
export function irelandCountry() {
    let retireAge = {
        Age: 66,
        Month: 0,
        countryCode: "IE",
        country: "IRELAND"
    }
    return retireAge;
}

//netherland  country
export function netherlandsCountry() {
    let currentDate = new Date();
    let currYear = currentDate.getFullYear();
    let tempRetirementAge = "";
    let tempRetirementMonth = 0;
    if (currYear >= 2018 && currYear <= 2020) {
        tempRetirementAge = 66;
    } else if (currYear === 2021) {
        tempRetirementAge = 67;
    } else if (currYear >= 2022) {
        tempRetirementAge = 67;
        tempRetirementMonth = 3;
    }

    let retireAge = {
        Age: tempRetirementAge,
        Month: tempRetirementMonth,
        countryCode: "NL",
        country: "NETHERLANDS"
    }
    return retireAge;
}
//portugal  country
export function portugalCountry() {
    let retireAge = {
        Age: 66,
        Month: 2,
        countryCode: "PT",
        country: "PORTUGAL"
    }
    return retireAge;
}

export function savePensionForm(emailresult) {
    console.log("Start Bilateral Form");
    let bilateralInput = {
        UserID: emailresult,
        QueryName: "GetNotInGPAData",
        CountryCode: "AT"
    }
    let BilateralFormDataSourceUrl = "https://4k73oeispk.execute-api.us-west-2.amazonaws.com/dev/GPA_BenQusDatas_Lambda";
    let BilateralFormUrl = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";
    SaveDataAPICallMailSend(BilateralFormDataSourceUrl, bilateralInput)
        .then((data) => {
            let biltrlData = JSON.parse(data.AppAnsInJsonObj);
            let bilateralInputDataObj = {
                "html": "This is test Data",
                "language": "en",
                "DocCategory": "biltrl",
                "params": {
                    "empId": emailresult,//"spurthi.n@mitosistech.com",
                    "pensionData": {
                        "Name": [biltrlData.FirstName + " " + biltrlData.MiddleName + " " + biltrlData.LastName],
                        "SecurityNumber": [biltrlData.SecurityNumber],
                        "LastWorkingPlaceNameAgency": [biltrlData.LastWorkingPlaceNameAgency],
                        "Benefit": [biltrlData.Benefit],
                        "OtherBenefits": [biltrlData.TypeBenefits],
                        "ReceivingBenefits": [biltrlData.Receiving],
                        "Receiving1": [biltrlData.Receiving1],
                        "Receiving2": [biltrlData.Receiving2],
                        "Receiving3": [biltrlData.Receiving3],
                        "BirthName": [biltrlData.BirthName],
                        "Gender": [biltrlData.Gender],
                        "SIN2": [biltrlData.SIN2],
                        "MotherName": [biltrlData.MotherFirstName + " " + biltrlData.MotherMiddleName + " " + biltrlData.MotherLastName],
                        "FatherName": [biltrlData.FatherFirstName + " " + biltrlData.FatherMiddleName + " " + biltrlData.FatherLastName],
                        "NameCountry": [biltrlData.NameCountry],
                        "EligibleSpouse": [biltrlData.Eligible],
                        "IsWorkerClaimingBenefits": [biltrlData.Worker],
                        "Person": [biltrlData.Person],
                        "DateRefugee": [biltrlData.DateRefugee],
                        "Month": [biltrlData.Month],
                        "Day": [biltrlData.Day],
                        "Year": [biltrlData.Year],
                        "ApplyingForRetirement": [biltrlData.Apply],
                        "StopWorkMonth": [biltrlData.StopWorkMonth],
                        "StopWorkDay": [biltrlData.StopWorkDay],
                        "StopWorkYear": [biltrlData.StopWorkYear],
                        "Occp": [biltrlData.Occp],
                        "Occupation": [biltrlData.Occupation],
                        "Country": [biltrlData.Country],
                        "ApplicantName": [biltrlData.ApplicantName],
                        "Relationship": [biltrlData.Relationship],
                        "SecurityNumber2": [biltrlData.SecurityNumber2],
                        "SIN3": [biltrlData.SIN3],
                        "WorkerDOB": [biltrlData.WorkerDOB],
                        "PlaceBirth": [biltrlData.PlaceBirth],
                        "Death": [biltrlData.Death],
                        "PlaceDeath": [biltrlData.PlaceDeath],
                        "Service": [biltrlData.Service],
                        "FromService": [biltrlData.FromService],
                        "ToService": [biltrlData.ToService],
                        "BenefitService": [biltrlData.BenefitService],
                        "RecipientName": [biltrlData.RecipientName],
                        "USAgency": [biltrlData.USAgency],
                        "ClaimNumber": [biltrlData.ClaimNumber],
                        "RecipientName1": [biltrlData.RecipientName1],
                        "USAgency1": [biltrlData.USAgency1],
                        "ClaimNumber1": [biltrlData.ClaimNumber1],
                        "Number": [biltrlData.Number],
                        "NameAddressEmployer": [biltrlData.NameAddressEmployer],
                        "WorkBegan": [biltrlData.WorkBegan],
                        "WorkEnd": [biltrlData.WorkEnd],
                        "NameAddressEmployer2": "",
                        "WorkBegan2": [],
                        "WorkEnd2": [],
                        "Employer": [biltrlData.Employer],
                        "UnderAge": [biltrlData.UnderAge],
                        "OverAge": [biltrlData.OverAge],
                        "ChildName": [biltrlData.ChildName],
                        "RelationshipWrk": [biltrlData.RelationshipWrk],
                        "ChildrenDateofBirth": [biltrlData.ChildrenDateofBirth],
                        "Partner": [biltrlData.Partner],
                        "PartnerDateofBirth": [biltrlData.PartnerDateofBirth],
                        "PartnerDateMarriage": [biltrlData.PartnerDateMarriage],
                        "PartnerDateofDivorce": [biltrlData.PartnerDateofDivorce],
                        "Citizenship": [biltrlData.Citizenship],
                        "SIN4": [biltrlData.SIN4],
                        "SecurityNumber3": [biltrlData.SecurityNumber3],
                        "Former": [biltrlData.Former],
                        "PartnerName": [biltrlData.PartnerName],
                        "PartnerDateofBirth1": [biltrlData.PartnerDateofBirth1],
                        "PartnerDateMarriage1": [biltrlData.PartnerDateMarriage1],
                        "PartnerDateofDivorce1": [biltrlData.PartnerDateofDivorce1],
                        "Citizenship1": [biltrlData.Citizenship1],
                        "SIN5": [biltrlData.SIN5],
                        "SecurityNumber4": [biltrlData.SecurityNumber4],
                        "Former1": [biltrlData.Former1],
                        "PartnerName1": [biltrlData.PartnerName1],
                        "PartnerDateofBirth2": [biltrlData.PartnerDateofBirth2],
                        "PartnerDateofMarriage2": [biltrlData.PartnerDateofMarriage2],
                        "PartnerDateofDivorce2": [biltrlData.PartnerDateofDivorce2],
                        "Citizenship2": [biltrlData.Citizenship2],
                        "SIN6": [biltrlData.SIN6],
                        "SecurityNumber5": [biltrlData.SecurityNumber5],
                        "Number1": [biltrlData.Number1],
                        "NameSIN2": [biltrlData.NameSIN2],
                        "Benefit1": [biltrlData.Benefit1],
                        "ClaimNumber2": [biltrlData.ClaimNumber2],
                        "AmountBenefits": [biltrlData.AmountBenefits],
                        "AgencyClaim": [biltrlData.AgencyClaim],
                        "Remark": [biltrlData.Remark],
                        "SignDate": [biltrlData.SignDate],
                        "Phone": [biltrlData.Phone],
                        "CityST": [biltrlData.CityST],
                        "Zip": [biltrlData.Zip],
                        "Signature": [biltrlData.Signature]
                    }
                }
            };
            console.log(JSON.stringify(bilateralInputDataObj));
            SaveDataAPICallMailSend(BilateralFormUrl, bilateralInputDataObj)
                .then((data) => {

                    console.log("Bilateral Form saved");
                    notify.show("Bilateral  form successfully Generated", "success", 3000);
                    this.handleRedirect(this);
                }).catch((err) => {
                    console.log("error sending email");
                });
        }).catch((err) => {
            console.log(err);
        });
}


