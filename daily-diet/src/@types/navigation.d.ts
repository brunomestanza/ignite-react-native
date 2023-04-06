export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      mealInfo: undefined;
      status: {
        positiveMeals: number;
        negativeMeals: number;
        totalOfMeals: number;
        typeOfPercentage: 'POSITIVE' | 'NEGATIVE';
        percentage: number;
      };
      feedback: {
        type: 'YES' | 'NO';
      };
    }
  }
}
