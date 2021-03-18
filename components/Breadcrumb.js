import NextLink from "next/link";
import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/breadcrumb";
import { ChevronRightIcon } from "@chakra-ui/icons";

function BreadCrumb(props) {
  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem>
        <NextLink href="/">Home</NextLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <NextLink href="/">Country</NextLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <span>{props.name}</span>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default BreadCrumb;
