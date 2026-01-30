---
description: Generate all required translation keys for a feature
allowed-tools: Read, Edit, Glob
argument-hint: [feature-name]
---

# Generate Translation Keys

Generate all required translation keys for a new feature.

## Arguments
- `$1` - Feature name in singular form (e.g., `category`)

## Translation Files

- English: `apps/admin/app/localization/en.ts`
- Portuguese: `apps/admin/app/localization/pt.ts`

## Keys to Generate

For a feature named `$1` (e.g., `category`), add these keys to BOTH files:

### Titles
```typescript
titles: {
    $1s: "Categories",                    // Plural display name
    add_$1: "Add category",               // Add page title
    edit_$1: "Edit category",             // Edit page title
}
```

### Buttons
```typescript
buttons: {
    add_$1: "Add category",               // Add button text
    edit_$1: "Edit category",             // Edit button in menu
    delete_$1: "Delete category",         // Delete button in menu/dialog
}
```

### Success Messages
```typescript
success: {
    $1_created: "Category created successfully.",
    $1_updated: "Category updated successfully.",
    $1_deleted: "Category deleted successfully.",
}
```

### Empty States
```typescript
empty_states: {
    $1s_table: "There are no categories matching your search.",
}
```

### Placeholders
```typescript
placeholders: {
    type_to_search_$1s: "Type to search categories",
}
```

### Dialogs
```typescript
dialogs: {
    delete_$1: {
        title: "Do you want to delete this category?",
        description: "This action will delete the category and all associated information. This operation is irreversible.",
    },
}
```

### ARIA Labels
```typescript
aria_labels: {
    $1s_table: "Categories table",
    $1s_table_actions: "Category actions",
}
```

## Portuguese Translations

Remember to provide proper Portuguese translations for `pt.ts`:

```typescript
// Example for "category" feature in pt.ts
titles: {
    categories: "Categorias",
    add_category: "Adicionar categoria",
    edit_category: "Editar categoria",
}

buttons: {
    add_category: "Adicionar categoria",
    edit_category: "Editar categoria",
    delete_category: "Excluir categoria",
}

success: {
    category_created: "Categoria criada com sucesso.",
    category_updated: "Categoria atualizada com sucesso.",
    category_deleted: "Categoria excluída com sucesso.",
}

empty_states: {
    categories_table: "Não há categorias correspondentes à sua pesquisa.",
}

placeholders: {
    type_to_search_categories: "Digite para pesquisar categorias",
}

dialogs: {
    delete_category: {
        title: "Deseja excluir esta categoria?",
        description: "Esta ação excluirá a categoria e todas as informações associadas. Esta operação é irreversível.",
    },
}

aria_labels: {
    categories_table: "Tabela de categorias",
    categories_table_actions: "Ações da categoria",
}
```

## Instructions

1. Read both translation files to understand current structure
2. Find the appropriate sections in each file
3. Add all required keys maintaining alphabetical order where applicable
4. Ensure Portuguese translations are accurate and natural

## Example Usage

```
/translations category
```

## Reference

- Existing translations: `apps/admin/app/localization/en.ts`
