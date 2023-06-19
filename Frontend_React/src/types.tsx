import React from "react";

export type ItemType = {id: number, checked: boolean, item: string};
export type ItemProps = { item: ItemType, handleCheck: (id: number) => void, handleDelete: (id: number) => void};
export type BodyPros = { inProgressItems: ItemType[], completedItems: ItemType[], handleCheck: (id: number) => void, handleDelete: (id: number) => void};
export type AddItemPros = { item: string, setNewItem: React.Dispatch<React.SetStateAction<string>>, handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void};
export type SearchItemPros = { item: string, setSearchItem: React.Dispatch<React.SetStateAction<string>>};
export type ListItemProps = { items: ItemType[], handleCheck: (id: number) => void, handleDelete: (id: number) => void};
export type HeaderProps = {title: string};
export type FooterProps = { length: number};