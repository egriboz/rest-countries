import NextLink from "next/link";
import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/breadcrumb";
import { ChevronRightIcon } from "@chakra-ui/icons";

function BreadCrumb(props) {
  return (
    <Breadcrumb
      color="whiteAlpha.600"
      spacing="5px"
      separator={<ChevronRightIcon color="whiteAlpha.600" />}
    >
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
