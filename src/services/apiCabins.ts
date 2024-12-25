import { FileImageType } from "../features/cabins/CreateCabinForm";
import supabase, { supabaseUrl } from "./supabase";

export interface CabinType {
  created_at: string;
  description: string;
  discount: number;
  id: number;
  image: null | string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}
export interface CabinCreate {
  description: string;
  discount: number;
  image: FileImageType | string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data as CabinType[];
};

export const deleteCabin = async (id: number) => {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};
interface CreateCabinFnType {
  id: number;
  newCabin: CabinCreate;
}

export const createEditCabin = async (update: CreateCabinFnType) => {
  const { id, newCabin } = update;

  const isImageOld = typeof newCabin.image === "string";
  const imageName =
    typeof newCabin.image !== "string" && newCabin.image.name
      ? `${Math.random()}-${newCabin.image.name}`
      : "";

  const imagePath = isImageOld
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  if (!id) {
    const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select();
    if (error) {
      console.error(error);
      throw new Error("Cabins could not be loaded");
    }
    const nCabin = data as CabinType[];
    if (!isImageOld) {
      const { error: StorageError } = await supabase.storage
        .from("cabins")
        .upload(imageName, newCabin.image);

      if (StorageError) {
        await supabase.from("cabins").delete().eq("id", nCabin.at(0)?.id);
        console.error(StorageError);
        throw new Error("Cabin image could not be created");
      }
    }

    return data;
  }
  if (id) {
    const { error, data } = await supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      console.error(error);
      throw new Error("Cabins could not be loaded");
    }
    const nCabin = data as CabinType;
    if (!isImageOld) {
      const { error: StorageError } = await supabase.storage
        .from("cabins")
        .upload(imageName, newCabin.image);

      if (StorageError) {
        await supabase.from("cabins").delete().eq("id", nCabin.id);
        console.error(StorageError);

        throw new Error("Cabin image could not be created");
      }
    }

    return data;
  }
};
