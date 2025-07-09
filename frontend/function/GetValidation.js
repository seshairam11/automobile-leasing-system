export const GetValidation = () => {
  return function validateControls(ctl_attribute) {

    if (ctl_attribute.validate.mandatory === true) {
      let brewErr = checkMandatory(ctl_attribute);
      if (brewErr.founderror === true) {
        return brewErr;
      }
    }

    return checkValidateDataType(ctl_attribute);
  };

  function checkValidateDataType(ctl_attribute) {
    let brewError = {};
    if (ctl_attribute.inputvalue != "") {
      switch (ctl_attribute.validate.datatype) {
        case "email":
          let retvalidemail = validateEmail(ctl_attribute.inputvalue);
          if (retvalidemail === null) {
            brewError.controlid = ctl_attribute.theme.id;
            brewError.errmsg = "No Valid Email address entered";
            brewError.founderror = true;
            brewError.arrayindex = ctl_attribute.arrayindex;
          }
          break;
        case "phoneno":
          let retvalidphone = validatePhoneNo(ctl_attribute.inputvalue);
          let retvalidphonecode = validatePhoneCode(ctl_attribute.inputkey);
          if (retvalidphone === false) {
            brewError.controlid = ctl_attribute.theme.id;
            brewError.errmsg = "Invalid Phone no entered";
            brewError.founderror = true;
            brewError.arrayindex = ctl_attribute.arrayindex;
          } else if (retvalidphonecode === false) {
            brewError.controlid = ctl_attribute.theme.id;
            brewError.errmsg = "Phone Code doesn't been empty";
            brewError.founderror = true;
            brewError.arrayindex = ctl_attribute.arrayindex;
          }
          break;
        case "numeric":
          let retvalidnumeric = validateIsNumber(ctl_attribute.inputvalue);
          if (retvalidnumeric === false) {
            brewError.controlid = ctl_attribute.theme.id;
            brewError.errmsg = "Accepts Only Numeric Field";
            brewError.founderror = true;
            brewError.arrayindex = ctl_attribute.arrayindex;
          }
          break;
        case "loginid":
          let retvalidLoginid = validateIsLoginID(ctl_attribute.inputvalue);
          if (retvalidLoginid === false) {
            brewError.controlid = ctl_attribute.theme.id;
            brewError.errmsg = "Invalid Field entered";
            brewError.founderror = true;
            brewError.arrayindex = ctl_attribute.arrayindex;
          }
          break;
        case "aadharno":
          let retvalidAadhar = validateAadharNo(ctl_attribute.inputvalue);
          if (retvalidAadhar === false) {
            brewError.controlid = ctl_attribute.theme.id;
            brewError.errmsg = "Invalid Aadhar no";
            brewError.founderror = true;
            brewError.arrayindex = ctl_attribute.arrayindex;
          }
          break;
        case "alpha":
          let retvalidAlpha = validateAlpha(ctl_attribute.inputvalue);
          if (retvalidAlpha === false) {
            brewError.controlid = ctl_attribute.theme.id;
            brewError.errmsg = "Invalid field Only Alphabet";
            brewError.founderror = true;
            brewError.arrayindex = ctl_attribute.arrayindex;
          }
          break;
        case "alphanumeric":
          let retvalidAlphaNumeric = validateAlphaNumeric(ctl_attribute.inputvalue);
          if (retvalidAlphaNumeric === false) {
            brewError.controlid = ctl_attribute.theme.id;
            brewError.errmsg = "Invalid field Only AlphaNumeric";
            brewError.founderror = true;
            brewError.arrayindex = ctl_attribute.arrayindex;
          }
          break;
        case "dropdown":
          let retvalidDropDown = validateDropDown(ctl_attribute.inputvalue);
          if (retvalidDropDown === false) {
            brewError.controlid = ctl_attribute.theme.id;
            brewError.errmsg = "Invalid Selection";
            brewError.founderror = true;
            brewError.arrayindex = ctl_attribute.arrayindex;
          }
          break;
        case "username":
          let retvalidUserName = validateUserName(ctl_attribute.inputvalue);
          if (retvalidUserName === false) {
            brewError.controlid = ctl_attribute.theme.id;
            brewError.errmsg = "Invalid Syntax only (@ and _ )";
            brewError.founderror = true;
            brewError.arrayindex = ctl_attribute.arrayindex;
          }
          break;

        case "hotelcode":
          let retvalidGOTID = validateHotelCode(ctl_attribute.inputvalue);
          if (retvalidGOTID === false) {
            brewError.controlid = ctl_attribute.theme.id;
            brewError.errmsg = "Invalid offer ID";
            brewError.founderror = true;
            brewError.arrayindex = ctl_attribute.arrayindex;
          }
          break;
        case "searchBox":
          let retvalidssearchbox = validateSearchBox(ctl_attribute);
          if (retvalidssearchbox === false) {
            brewError.controlid = ctl_attribute.theme.id;
            brewError.errmsg = "Not in Menu";
            brewError.founderror = true;
            brewError.arrayindex = ctl_attribute.arrayindex;
          }
          break;
        default:
          brewError.controlid = ctl_attribute.theme.id;
          brewError.errmsg = "";
          brewError.founderror = false;
          brewError.arrayindex = ctl_attribute.arrayindex;
          break;
      }
    }
    return brewError;
  }

  function validatePhoneNo(phoneno) {
    let a = /^\d{10}$/;
    return a.test(phoneno);
  }
  function validateHotelCode(hotelcode) {
    let a = /^\d{9}$/;
    return a.test(hotelcode);
  }

  function validateUserName(username) {
    let s = /^[a-zA-Z0-9\_\@]+$/;
    return s.test(username)
  }

  function validateAadharNo(aadharno) {
    let s = /^\d{12}$/;
    return s.test(aadharno);
  }
  function validateAlpha(alpha) {
    let s = /^[A-Za-z\ ]+$/;
    return s.test(alpha);
  }
  function validateAlphaNumeric(alphanumeric) {
    let s = /^[0-9a-zA-Z\ ]+$/;
    return s.test(alphanumeric);
  }
  function validatePhoneCode(phonecode) {
    let _bool = true;
    if (phonecode === "") {
      _bool = false;
    }
    return _bool;
  }
  function validateDropDown(dropdown) {
    let _bool = true;
    if (dropdown === "") {
      _bool = false;
    }
    return _bool;
  }
  function validateEmail(email) {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  function isOnlyNumbers(input) {
    const numberRegex = /^\d+$/;
    return numberRegex.test(input);
  }
  function validateIsLoginID(loginid) {
    if (isOnlyNumbers(loginid)) {
      return validatePhoneNo(loginid);
    } else if (validateEmail(loginid)) {
      return true;
    } else if (validateUserName(loginid)) {
      return true;
    } else {
      return false;
    }

  }
  function validateSearchBox(attribute) {
    let _filterarr = attribute.dropdownlist.filter(item => item.m_value === attribute.inputvalue);
    let _bool = true
    if (_filterarr.length === 0) {
      _bool = false
    }
    return _bool;
  }
  function validateIsNumber(ivalue) {
    return !isNaN(parseFloat(ivalue)) && isFinite(ivalue);
  }
  function checkMandatory(ctl_attribute) {
    let brewError = {};
    if (ctl_attribute.inputvalue === "") {
      brewError.controlid = ctl_attribute.theme.id;
      brewError.errmsg = "This field is mandatory";
      brewError.founderror = true;
      brewError.arrayindex = ctl_attribute.arrayindex;
    } else if (ctl_attribute.inputkey === "") {
      brewError.controlid = ctl_attribute.theme.id;
      brewError.errmsg = "Invalid Selection";
      brewError.founderror = true;
      brewError.arrayindex = ctl_attribute.arrayindex;
    }
    else {
      brewError.controlid = ctl_attribute.theme.id;
      brewError.errmsg = "";
      brewError.founderror = false;
      brewError.arrayindex = ctl_attribute.arrayindex;
    }
    return brewError;
  }
}
