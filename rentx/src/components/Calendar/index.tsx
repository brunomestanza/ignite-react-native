import React from 'react';
import { Calendar as CustomCalendar, LocaleConfig, CalendarProps  } from 'react-native-calendars';
import { useTheme } from 'styled-components';
import { ptBr } from './localeConfig';
import { Feather } from '@expo/vector-icons';
import { generateInterval } from './generateInterval';
export { generateInterval };

export interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor?: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  }
}

export interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = 'pt-br';

export function Calendar({ onDayPress, markedDates }: CalendarProps){
  const theme = useTheme();

  return(
    <CustomCalendar
      firstDay={1}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomColor: theme.colors.text_detail,
        borderBottomWidth: 0.5,
        marginBottom: 10,
        paddingBottom: 10,
      }}
      markedDates={markedDates}
      markingType="period"
      minDate={String(new Date())}
      onDayPress={onDayPress}
      renderArrow={(direction) =>
        <Feather
          colors={theme.colors.shape}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
          size={24}
        />
      }
      theme={{
        arrowStyle: {
          marginHorizontal: -15,
        },
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_500,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
      }}
    />
  ); 
};
