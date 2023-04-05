// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file will be automatically regenerated when your Next.js server is running.
// nextjs-routes version: 1.0.8
/* eslint-disable */

// prettier-ignore
declare module "nextjs-routes" {
  export type Route =
    | StaticRoute<"/404">
    | StaticRoute<"/500">
    | DynamicRoute<"/auth/activate/[token]", { "token": string }>
    | StaticRoute<"/auth">
    | StaticRoute<"/auth/login">
    | StaticRoute<"/auth/register">
    | DynamicRoute<"/auth/reset/[token]", { "token": string }>
    | StaticRoute<"/auth/reset">
    | StaticRoute<"/dashboard/admin/home">
    | DynamicRoute<"/dashboard/admin/members/[memberId]", { "memberId": string }>
    | StaticRoute<"/dashboard/admin/members">
    | DynamicRoute<"/dashboard/admin/posts/[postId]", { "postId": string }>
    | StaticRoute<"/dashboard/admin/posts">
    | StaticRoute<"/dashboard/athlete/home">
    | StaticRoute<"/dashboard/athlete/posts">
    | StaticRoute<"/dashboard/coach/athletes">
    | StaticRoute<"/dashboard/coach/home">
    | DynamicRoute<"/dashboard/coach/members/[memberId]", { "memberId": string }>
    | StaticRoute<"/dashboard/coach/members">
    | DynamicRoute<"/dashboard/coach/posts/[postId]", { "postId": string }>
    | StaticRoute<"/dashboard/coach/posts">
    | StaticRoute<"/dashboard">
    | StaticRoute<"/dashboard/notifications">
    | DynamicRoute<"/dashboard/parent/child/[id]", { "id": string }>
    | StaticRoute<"/dashboard/parent/home">
    | StaticRoute<"/dashboard/profile">
    | StaticRoute<"/dashboard/school">
    | StaticRoute<"/dashboard/staff/home">
    | StaticRoute<"/dashboard/staff/posts">
    | DynamicRoute<"/dashboard/staff/schools/[schoolId]", { "schoolId": string }>
    | DynamicRoute<"/dashboard/staff/schools/[schoolId]/members/[memberId]", { "schoolId": string; "memberId": string }>
    | StaticRoute<"/dashboard/staff/schools">
    | StaticRoute<"/dashboard/staff/settings">
    | StaticRoute<"/dashboard/staff/staff">
    | StaticRoute<"/dashboard/staff/users">
    | StaticRoute<"/">;

  interface StaticRoute<Pathname> {
    pathname: Pathname;
    query?: Query | undefined;
    hash?: string | null | undefined;
  }

  interface DynamicRoute<Pathname, Parameters> {
    pathname: Pathname;
    query: Parameters & Query;
    hash?: string | null | undefined;
  }

  interface Query {
    [key: string]: string | string[] | undefined;
  };

  export type RoutedQuery<P extends Route["pathname"]> = Extract<
    Route,
    { pathname: P }
  >["query"];

  export type Locale = undefined;

  /**
   * A typesafe utility function for generating paths in your application.
   *
   * route({ pathname: "/foos/[foo]", query: { foo: "bar" }}) will produce "/foos/bar".
   */
  export declare function route(r: Route): string;
}

// prettier-ignore
declare module "next/link" {
  import type { Route } from "nextjs-routes";
  import type { LinkProps as NextLinkProps } from "next/dist/client/link";
  import type {
    AnchorHTMLAttributes,
    DetailedReactHTMLElement,
    MouseEventHandler,
    PropsWithChildren,
  } from "react";
  export * from "next/dist/client/link";

  type Query = { query?: { [key: string]: string | string[] | undefined } };
  type StaticRoute = Exclude<Route, { query: any }>["pathname"];

  export interface LinkProps
    extends Omit<NextLinkProps, "href" | "locale">,
      AnchorHTMLAttributes<HTMLAnchorElement> {
    href: Route | StaticRoute | Query;
    locale?: false;
  }

  type LinkReactElement = DetailedReactHTMLElement<
    {
      onMouseEnter?: MouseEventHandler<Element> | undefined;
      onClick: MouseEventHandler;
      href?: string | undefined;
      ref?: any;
    },
    HTMLElement
  >;

  declare function Link(props: PropsWithChildren<LinkProps>): LinkReactElement;

  export default Link;
}

// prettier-ignore
declare module "next/router" {
  import type { Locale, Route, RoutedQuery } from "nextjs-routes";
  import type { NextRouter as Router } from "next/dist/client/router";
  export * from "next/dist/client/router";
  export { default } from "next/dist/client/router";

  type NextTransitionOptions = NonNullable<Parameters<Router["push"]>[2]>;
  type StaticRoute = Exclude<Route, { query: any }>["pathname"];
  type Query = { query?: { [key: string]: string | string[] | undefined } };

  interface TransitionOptions extends Omit<NextTransitionOptions, "locale"> {
    locale?: false;
  }

  export type NextRouter<P extends Route["pathname"] = Route["pathname"]> =
    Extract<Route, { pathname: P }> &
      Omit<
        Router,
        | "push"
        | "replace"
        | "locale"
        | "locales"
        | "defaultLocale"
        | "domainLocales"
      > & {
        defaultLocale?: undefined;
        domainLocales?: undefined;
        locale?: Locale;
        locales?: undefined;
        push(
          url: Route | StaticRoute | Query,
          as?: string,
          options?: TransitionOptions
        ): Promise<boolean>;
        replace(
          url: Route | StaticRoute | Query,
          as?: string,
          options?: TransitionOptions
        ): Promise<boolean>;
        route: P;
      };

  export function useRouter<P extends Route["pathname"]>(): NextRouter<P>;
}
