export interface Dictionary {
  buttons: {
    newCheck: string;
    cancel: string;
    previous: string;
    omit: string;
    add: string;
    next: string;
    complete: string;
    download: string;
    openCheck: string;
    deleteCheck: string;
    viewOnGitHub: string;
    close: string;
  };
  locales: {
    [key: string]: string;
  };
  parameters: {
    ageBand: {
      primary: string;
      description: string;
    };
    saturationOfPeripheralOxygen: {
      primary: string;
      secondary: string;
      description: string;
    };
    fractionOfInspiredOxygen: {
      primary: string;
      secondary: string;
    };
    respiratorySupport: {
      primary: string;
      description: string;
    };
    vasoactiveMedicationCount: {
      primary: string;
      description: string;
    };
    lactateConcentration: {
      primary: string;
      description: string;
    };
    meanArterialPressure: {
      primary: string;
      secondary: string;
      description: string;
    };
    plateletConcentration: {
      primary: string;
    };
    internationalNormalizedRatio: {
      primary: string;
      secondary: string;
    };
    dDimerConcentration: {
      primary: string;
    };
    fibrinogenConcentration: {
      primary: string;
    };
    glasgowComaScale: {
      primary: string;
      secondary: string;
      description: string;
    };
    pupilState: {
      primary: string;
    };
  };
  ageBandLabels: {
    lessThanOneMonth: string;
    oneToLessThanTwelveMonths: string;
    oneToLessThanTwoYears: string;
    twoToLessThanFiveYears: string;
    fiveToLessThanTwelveYears: string;
    twelveToLessThanEighteenYears: string;
  };
  parameterCount: string;
  invalidValue: string;
  respiratorySupportLabels: {
    none: string;
    nonInvasive: string;
    invasive: string;
  };
  pupilStateLabels: {
    reactive: string;
    fixedBilaterally: string;
  };
  parameterTypeLabels: {
    other: string;
    respiratory: string;
    cardiovascular: string;
    coagulation: string;
    neurological: string;
  };
  omitted: string;
  appearanceLabels: {
    light: string;
    dark: string;
    system: string;
  };
  diagnosisLabels: {
    noDiagnosis: string;
    noSepsis: string;
    sepsis: string;
    septicShock: string;
  };
  scoreLabel: string;
  tooltips: {
    returnHome: string;
    changeAppearance: string;
    changeLocale: string;
    openParameterDescription: string;
  };
  links: {
    acknowledgements: string;
    privacyPolicy: string;
    license: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  acknowledgements: string;
  privacyPolicy: string;
}
