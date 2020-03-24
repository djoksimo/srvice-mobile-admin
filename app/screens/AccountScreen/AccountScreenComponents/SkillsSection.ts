// @flow
import React from "react";
import { View } from "react-native";
import _ from "lodash";

import styles from "../styles";
import Pill from "./Pill";
import { Text } from "components";
import Heading from "./Heading";

type Props = {
  skills: Array<string>,
  onEditPressed: Function,
};

const SkillsSection = (props: Props) => {
  const { skills, onEditPressed } = props;

  const skillsSection = _.isEmpty(skills) ? (
    <Text>Looks like you have not added your skills yet</Text>
  ) : (
    <View style={styles.pillsContainer}>
      {skills.map((skill, index) => (
        <View key={index} style={styles.pillContainer}>
          <Pill title={skill} key={index} />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.skillsContainer}>
      <Heading title="Skills" onEditPressed={onEditPressed} />
      {skillsSection}
    </View>
  );
};

export default SkillsSection;
