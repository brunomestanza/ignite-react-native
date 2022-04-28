import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import { Container, Header, Title, Category, Icon, Name, Separator, Footer } from "./styles";

interface Category {
  key: string;
  name: string;
}

interface CategorySelectProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({ category, setCategory, closeSelectCategory }: CategorySelectProps) {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            isActive={category.key === item.key}
            onPress={() => setCategory(item)}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
        style={{ flex: 1, width: '100%' }}
      />
      <Footer>
        <Button onPress={closeSelectCategory} title="Selecionar" />
      </Footer>
    </Container>
  );
};
