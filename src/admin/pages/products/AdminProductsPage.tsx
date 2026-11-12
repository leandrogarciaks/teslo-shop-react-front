import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomPagination } from '@/components/custom/CustomPagination';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { Button } from './../../../components/ui/button';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router';
import { useProducts } from '@/shop/hook/useProducts';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';

export const AdminProductsPage = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) return <CustomFullScreenLoading />;

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle title="Productos" subtitle="Aqui puedes ver y administrar tus productos" />
        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <strong>Id</strong>
            </TableHead>
            <TableHead>
              <strong>Imagen</strong>
            </TableHead>
            <TableHead>
              <strong>Nombre</strong>
            </TableHead>
            <TableHead>
              <strong>Precio</strong>
            </TableHead>
            <TableHead>
              <strong>Categoria</strong>
            </TableHead>
            <TableHead>
              <strong>Inventario</strong>
            </TableHead>
            <TableHead>
              <strong>Tallas</strong>
            </TableHead>
            <TableHead className="text-right">
              <strong>Acciones</strong>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>
                <img
                  src={product.images[0]}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>
              <TableCell>
                <Link
                  to={`/admin/products/${product.id}`}
                  className="hover:text-blue-400 underline"
                >
                  {product.title}
                </Link>
              </TableCell>
              <TableCell>{currencyFormatter(product.price)}</TableCell>
              <TableCell>{product.tags}</TableCell>
              <TableCell>{product.stock} stock</TableCell>
              <TableCell>{product.sizes.join(', ')}</TableCell>
              <TableCell className="text-right">
                <Link to={`/admin/products/${product.id}`} className="flex gap-2">
                  <PencilIcon className="w-4 h-4 text-blue-400" />
                  Editar
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};
