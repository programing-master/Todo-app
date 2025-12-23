import React from "react";
import Controller from "../../components/Controller";
import ListCard from "../../components/ListCard";
import Title from "../../components/Title";

export default function TaskPage() {
  return (
    <div className="p-4">
      <Title title={"Test - Tasks"} />

      <Controller />
      <ListCard />
    </div>
  );
}
