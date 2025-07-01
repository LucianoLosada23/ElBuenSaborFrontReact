import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import type {
  CreatePromotions,
  Promotions,
} from "../../../types/promotions/Promotions";
import { getAllPromotionsTypes } from "../../../services/admin/promotions/promotionsTypes";
import { getAllProduct } from "../../../services/admin/product/product";
import {
  createPromotion,
  updatePromotion,
} from "../../../services/admin/promotions/promotions";
import { useUIState } from "../../../hooks/ui/useUIState";
import { translateDayOfWeek } from "../../../utils/statusTranslations";

type PromotionFormProps = {
  onRefresh: () => void;
  promotionsToEdit?: Promotions | null;
  setPromotionsToEdit: React.Dispatch<React.SetStateAction<Promotions | null>>;
};

type ProductItem = {
  id: number;
  title: string;
  price: number;
};

export default function PromotionForm({
  onRefresh,
  promotionsToEdit,
  setPromotionsToEdit,
}: PromotionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePromotions>();

  const [step, setStep] = useState(1);
  const [productValues, setProductValues] = useState<Record<string, number>>({});
  const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [promotionTypes, setPromotionTypes] = useState<
    { id: number; name: string }[]
  >([]);
  const [productList, setProductList] = useState<ProductItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<ProductItem[]>([]);
  const { toggle } = useUIState();

  // Cargar productos y tipos
  useEffect(() => {
    const fetchInitialData = async () => {
      const [products, types] = await Promise.all([
        getAllProduct(),
        getAllPromotionsTypes(),
      ]);
      if (products) {
        setProductList(
          products.map((p: any) => ({
            id: p.id,
            title: p.title,
            price: p.price,
          }))
        );
      }
      if (types) setPromotionTypes(types);
    };
    fetchInitialData();
  }, []);

  // Prellenar formulario si se edita
  useEffect(() => {
    if (promotionsToEdit) {
      const {
        title,
        discountDescription,
        dateFrom,
        dateTo,
        timeFrom,
        timeTo,
        dayOfWeeks,
        promotionTypeDTO,
        productPromotions,
      } = promotionsToEdit;

      reset({
        title,
        discountDescription,
        dateFrom,
        dateTo,
        timeFrom,
        timeTo,
        promotionTypeId: promotionTypeDTO.id,
      });

      setSelectedDays(dayOfWeeks || []);

      if (productPromotions && productPromotions.length > 0) {
        const productsForForm: ProductItem[] = productPromotions
          .map((pp) => {
            if (pp.product) {
              return {
                id: pp.product.id,
                title: pp.product.title,
                price: pp.product.price,
              };
            }
            return null;
          })
          .filter(Boolean) as ProductItem[];

        setSelectedProducts(productsForForm);

        const promoPrices: Record<string, number> = {};
        productPromotions.forEach((pp) => {
          if (pp.productId && pp.value !== undefined) {
            promoPrices[pp.product.id] = pp.value;
          }
        });

        setProductValues(promoPrices);
      }
    }
  }, [promotionsToEdit, reset]);

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const onSubmit = async (data: CreatePromotions) => {
    const payload: CreatePromotions = {
      ...data,
      dayOfWeeks: selectedDays,
      productIds: Object.keys(productValues).map((id) => Number(id)),
      productValues,
    };

    try {
      let success = false;
      if (promotionsToEdit) {
        // Actualizar productPromotions con los valores nuevos
        const updatedProductPromotions = promotionsToEdit.productPromotions.map(
          (pp) => {
            const updatedValue = productValues[pp.productId ?? ""] ?? pp.value;
            return {
              ...pp,
              value: updatedValue,
            };
          }
        );

        const payloadToSend = {
          ...payload,
          id: promotionsToEdit.id,
          companyId: promotionsToEdit.companyId,
          isActive: promotionsToEdit.isActive,
          productPromotions: updatedProductPromotions,
          promotionTypeDTO: promotionsToEdit.promotionTypeDTO,
        };

        const result = await updatePromotion(promotionsToEdit.id, payloadToSend);
        success = Boolean(result);
        toast.success("Promoción actualizada");
      } else {
        const result = await createPromotion(payload);
        success = Boolean(result);
        toast.success("Promoción creada");
      }

      if (success) {
        onRefresh();
        toggle("isPromotionsOpen");
        setPromotionsToEdit(null);
      }
    } catch (error) {
      toast.error("Hubo un error al guardar la promoción");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Título *</label>
            <input
              {...register("title", { required: true })}
              placeholder="Ej: Promo hamburguesa"
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">Campo requerido</span>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Descripción *</label>
            <input
              {...register("discountDescription", { required: true })}
              placeholder="Ej: 2x1 todos los viernes"
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            />
            {errors.discountDescription && (
              <span className="text-red-500 text-sm">Campo requerido</span>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Desde *</label>
            <input
              type="date"
              {...register("dateFrom", { required: true })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Hasta *</label>
            <input
              type="date"
              {...register("dateTo", { required: true })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Hora Desde *</label>
            <input
              type="time"
              {...register("timeFrom", { required: true })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Hora Hasta *</label>
            <input
              type="time"
              {...register("timeTo", { required: true })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tipo de promoción *</label>
            <select
              {...register("promotionTypeId", {
                required: true,
                valueAsNumber: true,
              })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              defaultValue=""
            >
              <option value="" disabled>
                Selecciona tipo
              </option>
              {promotionTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {errors.promotionTypeId && (
              <span className="text-red-500 text-sm">Campo requerido</span>
            )}
          </div>

          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="bg-admin-principal hover:bg-admin-principal/50 text-white font-semibold px-5 py-3 rounded-full transition flex gap-4"
            >
              Siguiente
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="text-sm font-medium">Días de la semana</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayToggle(day)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    selectedDays.includes(day)
                      ? "bg-admin-principal text-white"
                      : "border-zinc-300 text-gray-700"
                  }`}
                >
                  {translateDayOfWeek(day).slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Productos y precios</label>

            <input
              type="text"
              placeholder="Buscar producto..."
              className="border px-2 py-1 w-full mt-2 mb-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Mostrar un solo resultado si hay coincidencia */}
            {searchTerm &&
              productList
                .filter(
                  (p) =>
                    p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    !selectedProducts.find((sp) => sp.id === p.id)
                )
                .map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      setSelectedProducts((prev) => [...prev, product]);
                      setSearchTerm("");
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <div className="flex justify-between">
                      <span>{product.title}</span>
                      <span className="text-sm text-gray-500">${product.price}</span>
                    </div>
                  </button>
                ))}

            <div className="space-y-3 mt-4">
              {selectedProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="w-40 truncate">
                    <div>{product.title}</div>
                    <div className="text-xs text-gray-500">
                      Precio actual: ${product.price}
                    </div>
                  </div>
                  <input
                    type="number"
                    placeholder="Precio promo"
                    className="border-b-2 border-zinc-300 py-1 w-32"
                    value={productValues[product.id] ?? ""}
                    onChange={(e) =>
                      setProductValues((prev) => ({
                        ...prev,
                        [product.id]: Number(e.target.value),
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProducts((prev) =>
                        prev.filter((p) => p.id !== product.id)
                      );
                      setProductValues((prev) => {
                        const newValues = { ...prev };
                        delete newValues[product.id];
                        return newValues;
                      });
                    }}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-5 py-3 rounded-full transition flex gap-4"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Atrás
            </button>
            <button
              type="submit"
              className="bg-admin-principal hover:bg-admin-principal/50 text-white font-semibold px-5 py-3 rounded-full transition"
            >
              {promotionsToEdit ? "Actualizar promoción" : "Crear promoción"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
