import React from "react";
import styles from "./styles";
import {
  ViewVertical,
  ViewHorizontal,
} from "../../../components/viewBox.component";
import { RadioButton } from "react-native-paper";
import { Text, Image, ScrollView, TouchableOpacity } from "react-native";

const QuestionComponent = ({ item, index, chooseAnswer, answer }) => {
  const { answers } = item;
  return (
    <ViewVertical key={index} style={styles.questionContainer}>
      <Text style={styles.questionText}>
        Câu hỏi {index + 1}: {item.question}
      </Text>
      <ViewVertical>
        <RadioButton.Group
          onValueChange={(value) => chooseAnswer(value, index, item._id, item.answer_id)}
          value={answer}
        >
          {answers &&
            answers.map((value, key) => {
              return (
                <ViewHorizontal style={styles.answerContainer} key={key}>
                  <RadioButton value={key.toString()} />
                  <Text style={styles.answerText}>{value}</Text>
                </ViewHorizontal>
              );
            })}
        </RadioButton.Group>
      </ViewVertical>
    </ViewVertical>
  );
};

export default QuestionComponent;
