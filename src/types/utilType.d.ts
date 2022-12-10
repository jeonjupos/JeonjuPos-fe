/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { FunctionComponent } from 'react';

export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;
export type Falsy = false | '' | 0 | null | undefined;
export type Nullish = null | undefined;
export type ObjectLiteral<T = any> = {
  [key: string]: T;
};

/**
 * @example
 * type Result = NonUndefined<string | null | undefined>; // "string | null"
 */
export type NonUndefined<A> = A extends undefined ? never : A;

/**
 * @example
 *   type Props = string;
 *   type Result = Nullable<Props>; // string | null | undefined
 *
 *   type Props = string[]
 *   type Result = Nullable<Props>; // (string | null | undefined)[]
 *
 *   type Props = { id: number; name: string; }
 *   type Result = Nullable<Props> // { id: number | null | undefined; name: string | null | undefined; }
 *
 */
export type Nullable<T> = T extends (infer U)[]
  ? (U | null | undefined)[]
  : T extends object
    ? { [P in keyof T]?: T[P] | null }
    : T extends Primitive
      ? T | null | undefined
      : T;

/**
 * @example
 *   type Props = { id: number; name: string };
 *   type Result = Entries<Props>; // ["id" | "name", number | string][]
 */
export type Entries<T> = {
  [K in keyof T]-?: [K, T[K]];
}[keyof T][];

/**
 * @example
 *   type Props = ["id", "name"];
 *   type Result = Union<Props> // "id" | "name";
 *
 *   type Props = { id: number; name: string; }
 *   type Result = Union<Props> // "id" | "name";
 */
export type Union<T> = T extends (infer E)[] ? E : T extends object ? keyof T : T;

/**
 * @example
 *   type Props = {name: string; setName: (name: string) => void; someKeys?: string; someFn?: (...args: any) => any;};
 *   type Result = FunctionKeys<Props>; // "setName | someFn"
 */
export type FunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? K : never;
}[keyof T];

/**
 * @example
 *   type Props = {name: string; setName: (name: string) => void; someKeys?: string; someFn?: (...args: any) => any;};
 *   type Result = NonFunctionKeys<MixedProps>; // "name | someKey"
 */
export type NonFunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? never : K;
}[keyof T];

/**
 * @example
 *   type Props = { readonly id: number; name: string; };
 *   type Result = WritableKeys<Props>; // "name"
 */
export type WritableKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] },
  { -readonly [Q in P]: T[P] },
  P>;
}[keyof T];

/**
 * @example
 *   type Props = { readonly id: number; name: string; };
 *   type Result = ReadonlyKeys<Props>; // "id"
 */
export type ReadonlyKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] },
  { -readonly [Q in P]: T[P] },
  never,
  P>;
}[keyof T];

/**
 * @example
 *   type Props = { req: number; reqUndef: number | undefined; opt?: string; optUndef?: number | undefined; };
 *   type Result = RequiredKeys<Props>; // "req" | "reqUndef"
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * @example
 *   type Props = { req: number; reqUndef: number | undefined; opt?: string; optUndef?: number | undefined; };
 *   type Result = OptionalKeys<Props>; // "opt" | "optUndef"
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? K : never;
}[keyof T];

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? A
  : B;

/**
 * @example
 *   type Props = { req: number; reqUndef: number | undefined; opt?: string; };
 *   type Result1 = PickByValueExact<Props, number>; // { req: number }
 *   type Result2 = PickByValueExact<Props, number | undefined>; // { reqUndef: number | undefined; }
 */
export type PickByValueExact<T, ValueType> = Pick<T,
{
  [Key in keyof T]-?: [ValueType] extends [T[Key]]
    ? [T[Key]] extends [ValueType]
      ? Key
      : never
    : never;
}[keyof T]>;

/**
 * @example
 *   type Props = { req: number; reqUndef: number | undefined; opt?: string; };
 *   type Result1 = OmitByValue<Props, number>; // { reqUndef: number | undefined; opt?: string; }
 *   type Result2 = OmitByValue<Props, number | undefined>; // { opt?: string; }
 */
export type OmitByValue<T, ValueType> = Pick<T,
{ [Key in keyof T]-?: T[Key] extends ValueType ? never : Key }[keyof T]>;

/**
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type DefaultProps = { age: number };
 *   type Result = Intersection<Props, DefaultProps>; // { age: number; }
 */
export type Intersection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>;

/**
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type DefaultProps = { age: number };
 *   type Result = Diff<Props, DefaultProps>; // { name: string; visible: boolean; }
 */
export type Diff<T extends object, U extends object> = Pick<T, keyof T extends keyof U ? never : keyof T>;

/**
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type NewProps = { age: string; other: string };
 *   type Result = Overwrite<Props, NewProps>; // { name: string; age: string; visible: boolean; }
 */
export type Overwrite<T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>> = Pick<I, keyof I>;

/**
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type NewProps = { age: string; other: string };
 *   type Result = Assign<Props, NewProps>; // { name: string; age: number; visible: boolean; other: string; }
 */
export type Assign<T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T> & Diff<U, T>> = Pick<I, keyof I>;

/**
 * @example
 *    type Props = {
 *      readonly name: string;
 *      readonly age: number;
 *      readonly visible: boolean;
 *    };
 *    type Result = Writable<Props>; // { name: string; age: number; visible: boolean; }
 */
export type Writable<T> = { -readonly [P in keyof T]: T[P] };

/**
 * @example
 *   type Props = {
 *     first: {
 *       second: {
 *         name: string;
 *       }
 *     }
 *   };
 *   type Result = DeepReadonly<Props>;
 *   // {
 *   //   readonly first: {
 *   //     readonly second: {
 *   //       readonly name: string;
 *   //     }
 *   //   }
 *   // };
 */
export type DeepReadonly<T> = T extends ((...args: any[]) => any) | Primitive
  ? T
  : T extends (infer U)[]
    ? DeepReadonlyArray<U>
    : T extends object
      ? DeepReadonlyObject<T>
      : T;
/** @private */
type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;
/** @private */
type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

/**
 * @example
 *   type Props = {
 *     first?: {
 *       second?: {
 *         name?: string;
 *       }
 *     }
 *   };
 *   type Result = DeepRequired<Props>;
 *   // {
 *   //   first: {
 *   //     second: {
 *   //       name: string;
 *   //     }
 *   //   }
 *   // };
 */
export type DeepRequired<T> = T extends (...args: any[]) => any
  ? T
  : T extends (infer U)[]
    ? DeepRequiredArray<U>
    : T extends object
      ? DeepRequiredObject<T>
      : NonUndefined<T>;
/** @private */
export type DeepRequiredArray<T> = NonUndefined<DeepRequired<T>[]>;
/** @private */
export type DeepRequiredObject<T> = NonUndefined<{
  [P in keyof T]-?: DeepRequired<T[P]>;
}>;

/**
 * @example
 *   type Props = {
 *     first: {
 *       second: {
 *         name: string;
 *       }
 *     }
 *   };
 *   type Result = DeepNullable<Props>
 *   // {
 *   //   first?: {
 *   //     second?: {
 *   //       name?: string | null;
 *   //     } | null;
 *   //   } | null;
 *   // } | null | undefined;
 */
export type DeepNullable<T> = T extends Primitive
  ? T | null | undefined
  : T extends (infer U)[]
    ? DeepNullableArray<U>
    : T extends object
      ? DeepNullableObject<T>
      : T;
/** @private */
type DeepNullableArray<T> = DeepNullable<T>[];
/** @private */
type DeepNullableObject<T> = {
  [P in keyof T]?: DeepNullable<T[P]> | null
};

/**
 * @example
 *   type Props = {
 *     first?: null | {
 *       second?: null | {
 *         name?: string | null |
 *         undefined;
 *       }
 *     }
 *   };
 *   type Result = DeepNonNullable<Props>;
 *   // {
 *   //   first: {
 *   //     second: {
 *   //       name: string;
 *   //     }
 *   //   }
 *   // };
 */
export type DeepNonNullable<T> = T extends (...args: any[]) => any
  ? T
  : T extends (infer U)[]
    ? DeepNonNullableArray<U>
    : T extends object
      ? DeepNonNullableObject<T>
      : NonNullable<T>;
/** @private */
export type DeepNonNullableArray<T> = NonNullable<DeepNonNullable<T>[]>;
/** @private */
export type DeepNonNullableObject<T> = NonNullable<{
  [P in keyof T]-?: DeepNonNullable<T[P]>;
}>;

/**
 * @example
 *   type Props = {
 *     first: {
 *       second: {
 *         name: string;
 *       }
 *     }
 *   };
 *   type Result = DeepPartial<Props>;
 *   // {
 *   //   first?: {
 *   //     second?: {
 *   //       name?: string;
 *   //     }
 *   //   }
 *   // };
 */
export type DeepPartial<T> = T extends Function
  ? T
  : T extends (infer U)[]
    ? DeepPartialArray<U>
    : T extends object
      ? DeepPartialObject<T>
      : T | undefined;
/** @private */
export type DeepPartialArray<T> = DeepPartial<T>[];
/** @private */
export type DeepPartialObject<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
};

/**
 * @example
 *    type Props = {
 *      name: string;
 *      age: number;
 *      visible: boolean;
 *    }
 *    type Result1 = Optional<Props>; // { name?: string; age?: number; visible?: boolean; }
 *    type Result2 = Optional<Props, 'age' | 'visible'>; // { name: string; age?: number; visible?: boolean; }
 */
export type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * @example
 *    type Props = { name: string; age: number; visible: boolean };
 *    type Result = ValuesType<Props>; // string | number | boolean
 *
 *    type Props = number[];
 *    type Result = ValuesType<Props>; // number
 *
 *    type Props = readonly symbol[];
 *    type Result = ValuesType<Props>; // symbol
 *
 *    type Props = [1, 2];
 *    type Result = ValuesType<Props>; // 1 | 2
 *
 *    type Props = readonly [1, 2];
 *    type Result = ValuesType<Props>; // 1 | 2
 *
 *    type Props = Uint8Array;
 *    type Result = ValuesType<Props>; // number
 */
export type ValuesType<T extends ReadonlyArray<any> | ArrayLike<any> | Record<any, any>> = T extends ReadonlyArray<any>
  ? T[number]
  : T extends ArrayLike<any>
    ? T[number]
    : T extends object
      ? T[keyof T]
      : never;

/**
 * @example
 *    type Props = {
 *      name?: string;
 *      age?: number;
 *      visible?: boolean;
 *    };
 *
 *    type Result1 = PickRequired<Props>; // { name: string; age: number; visible: boolean; }
 *    type Result2 = PickRequired<Props, 'age' | 'visible'>; // { name?: string; age: number; visible: boolean; }
 */
export type PickRequired<T extends object,
  K extends keyof T = keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;
type UnionToOvlds<U> = UnionToIntersection<U extends any ? (f: U) => void : never>;
type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

/**
 * @example
 *   type Props = 'a' | 'b' | 'c';
 *   type Result = UnionConcat<Props, ','>; // 'a' | 'b' | 'c' | 'a,b' | 'a,c' | 'b,c' | 'a,b,c';
 */
export type UnionConcat<U extends string, Sep extends string> = PopUnion<U> extends infer SELF
  ? SELF extends string
    ? Exclude<U, SELF> extends never
      ? SELF
      :
      | `${UnionConcat<Exclude<U, SELF>, Sep>}${Sep}${SELF}`
      | UnionConcat<Exclude<U, SELF>, Sep>
      | SELF
    : never
  : never;

type ArrayToTuple<T extends ReadonlyArray<string>, V = string> = keyof {
  [K in (T extends ReadonlyArray<infer U> ? U : never)]: V
};

export type ComponentPropsOf<T> = T extends FunctionComponent<infer P> ? P : {};
