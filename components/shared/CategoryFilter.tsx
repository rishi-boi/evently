"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

  //   useEffect(() => {
  //     const delayDebounceFn = setTimeout(() => {
  //       let newUrl = "";
  //       if (categories) {
  //         newUrl = formUrlQuery({
  //           params: searchParams.toString(),
  //           key: "query",
  //           value: categories,
  //         });
  //       } else {
  //         newUrl = removeKeysFromQuery({
  //           params: searchParams.toString(),
  //           keysToRemove: ["query"],
  //         });
  //       }
  //       router.push(newUrl, { scroll: false });
  //     }, 300);

  //     return () => clearTimeout(delayDebounceFn);
  //   }, [categories, searchParams, router]);

  const onSelectCategories = (category: string) => {
    let newUrl = "";
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newUrl, { scroll: false });
  };
  return (
    <Select onValueChange={(value: string) => onSelectCategories(value)}>
      <SelectTrigger className="select-field">Category </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>
        {categories.map((category) => (
          <SelectItem
            value={category.name}
            key={category._id}
            className="select-item p-regular-14"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
