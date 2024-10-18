// client/src/utilities/carUtilities.js

export const calculateCarPrice = (basePrice, options) => {
    let totalPrice = basePrice;
    
    // Add price for each option
    if (options.premiumPaint) totalPrice += 500;
    if (options.leatherSeats) totalPrice += 1000;
    if (options.navigationSystem) totalPrice += 1500;
    
    return totalPrice;
  };
  
  export const validateFeatureCombination = (features) => {
    // Example validation: Can't have economy package and luxury package together
    if (features.economyPackage && features.luxuryPackage) {
      return { valid: false, message: "Can't select both economy and luxury packages" };
    }
    
    // Add more validations as needed
    
    return { valid: true };
  };