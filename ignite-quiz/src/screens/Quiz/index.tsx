import { useEffect, useState } from 'react';
import { Alert, View, Text, BackHandler } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { QUIZ } from '../../data/quiz';
import { historyAdd } from '../../storage/quizHistoryStorage';
import { Loading } from '../../components/Loading';
import { Question } from '../../components/Question';
import { QuizHeader } from '../../components/QuizHeader';
import { ConfirmButton } from '../../components/ConfirmButton';
import { OutlineButton } from '../../components/OutlineButton';
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { ProgressBar } from '../../components/ProgressBar';
import { THEME } from '../../styles/theme';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { OverlayFeedback } from '../../components/OverlayFeedback';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics'

interface Params {
  id: string;
}

type QuizProps = typeof QUIZ[0];

export function Quiz() {
  const [points, setPoints] = useState(0);
  const [replyStatus, setReplyStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps);
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(null);
  const sharedQuestion = useSharedValue(0)
  const sharedScrollPosition = useSharedValue(0)
  const sharedPanPosition = useSharedValue(0)
  const questionStyleAnimated = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: interpolate(sharedQuestion.value, [0, 0.5, 1, 1.5, 2, 2.5, 3], [0, -15, 0, 15, 0, -15, 0]) }]
    }
  })
  const dragAnimatedStyle = useAnimatedStyle(() => {
    // make an inclination by 10
    const rotateZ = sharedPanPosition.value / 10

    return {
      transform: [
        { translateX: withSpring(sharedPanPosition.value) },
        { rotateZ: withSpring(`${rotateZ}deg`) },
      ]
    }
  })
  const fixedScrollViewAnimated = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: 1,
      paddingTop: 50,
      backgroundColor: THEME.COLORS.GREY_500,
      width: '110%',
      left: '-5%',
      opacity: interpolate(sharedScrollPosition.value, [50, 90], [0, 1], Extrapolate.CLAMP),
      transform: [
        { translateY: interpolate(sharedScrollPosition.value, [50, 100], [-40, 0], Extrapolate.CLAMP) }
      ]
    }
  })

  const headerAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(sharedScrollPosition.value, [70, 90], [1, 0], Extrapolate.CLAMP)
    }
  })

  const { navigate } = useNavigation();

  const route = useRoute();
  const { id } = route.params as Params;

  function handleSkipConfirm() {
    Alert.alert('Pular', 'Deseja realmente pular a questão?', [
      { text: 'Sim', onPress: () => handleNextQuestion() },
      { text: 'Não', onPress: () => { } }
    ]);
  }

  async function handleFinished() {
    await historyAdd({
      id: new Date().getTime().toString(),
      title: quiz.title,
      level: quiz.level,
      points,
      questions: quiz.questions.length
    });

    navigate('finish', {
      points: String(points),
      total: String(quiz.questions.length),
    });
  }

  function handleNextQuestion() {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prevState => prevState + 1)
    } else {
      handleFinished();
    }
  }

  async function handleConfirm() {
    if (alternativeSelected === null) {
      return handleSkipConfirm();
    }

    if (quiz.questions[currentQuestion].correct === alternativeSelected) {
      setPoints(prevState => prevState + 1);
      await playSound(true)
      setReplyStatus(1)
    } else {
      playSound(false)
      setReplyStatus(2)
      shakeAnimation()
    }
    
    setAlternativeSelected(null);
  }

  async function playSound(isCorrect: boolean) {
    const file = isCorrect ? require('../../assets/correct.mp3') : require('../../assets/wrong.mp3')
    const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: true })
    await sound.setPositionAsync(0)
    await sound.playAsync()
  }

  function handleStop() {
    Alert.alert('Parar', 'Deseja parar agora?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: () => navigate('home')
      },
    ]);

    return true;
  }

  const onPan = Gesture
  .Pan()
  .activateAfterLongPress(200)
  .onUpdate((event) => {
    // Only make an move animation to the left
    if (event.translationX < 0) {
      sharedPanPosition.value = event.translationX
    }
  })
  .onEnd((event) => {
    // Only calls the remove function if is moved 200 pixels to left
    if (event.translationX < -200) {
      // Make an code run in the ui animation thread, using it as an wrapper on function
      runOnJS(handleSkipConfirm)()
    }
    sharedPanPosition.value = 0
  })

  async function shakeAnimation() {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    sharedQuestion.value = withSequence(
      withTiming(3, { duration: 400, easing: Easing.bounce }),
      withTiming(0, undefined, (finished) => {
        'worklet'
        if (finished) {
          runOnJS(handleNextQuestion)()
        }
      })
    )
  }

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      sharedScrollPosition.value = event.contentOffset.y
    }
  })

  useEffect(() => {
    const quizSelected = QUIZ.filter(item => item.id === id)[0];
    setQuiz(quizSelected);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (quiz.questions) {
      handleNextQuestion();
    }
  }, [points]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleStop)

    return () => backHandler.remove()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <OverlayFeedback status={replyStatus} />
        <Animated.View style={fixedScrollViewAnimated}>
          <Text style={styles.fixedScrollViewTitle}>{quiz.title}</Text>
          <ProgressBar
            current={currentQuestion + 1}
            total={quiz.questions.length}
          />
        </Animated.View>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.question}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <Animated.View style={[styles.header, headerAnimatedStyles]}>
            <QuizHeader
              title={quiz.title}
              currentQuestion={currentQuestion + 1}
              totalOfQuestions={quiz.questions.length}
            />
          </Animated.View>

          <GestureDetector gesture={onPan}>
            <Animated.View style={[questionStyleAnimated, dragAnimatedStyle]}>
              <Question
                key={quiz.questions[currentQuestion].title}
                question={quiz.questions[currentQuestion]}
                alternativeSelected={alternativeSelected}
                setAlternativeSelected={setAlternativeSelected}
                onUnmount={() => setReplyStatus(0)}
              />
            </Animated.View>
          </GestureDetector>

          <View style={styles.footer}>
            <OutlineButton title="Parar" onPress={handleStop} />
            <ConfirmButton onPress={handleConfirm} />
          </View>
        </Animated.ScrollView>
    </View >
  );
}