import axios from 'axios';
import classes from './TaxesList.module.css';
import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Modal from './Modal';
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
} from 'date-fns';

function formatDuration(years, months, days) {
  let result = '';
  if (months > 12) {
    result += `${years} năm`;
  }
  if (days > 30) {
    result += `${months} tháng`;
  } else {
    result += `${days} ngày`;
  }
  return result;
}

function TaxesList(req) {
  const [taxes, setTaxes] = useState([]);
  let location = useLocation();
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get('http://localhost:4000/api/');
        setTaxes(response?.data?.result);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPost();
  }, [location]);
  return (
    <>
      {taxes.map((tax, id) => (
        <div key={id} className={classes['tax-item']}>
          <Link
            to={{
              pathname: `/edit/${tax._id}`,
              state: { taxData: tax },
            }}
          >
            <li>
              <strong>Mã số thuế:</strong> {tax.taxeCode}
            </li>
            <li>
              <strong>Tên công ty:</strong> {tax.companyName}
            </li>
            {tax.status != 2 && ( // Kiểm tra nếu trạng thái là 2
              <li>
                <strong>
                  Hoạt động được:
                  {formatDuration(
                    differenceInYears(tax.dateUpdate, tax.operatingDay),
                    differenceInMonths(tax.dateUpdate, tax.operatingDay),
                    differenceInDays(tax.dateUpdate, tax.operatingDay)
                  )}
                </strong>
              </li>
            )}
            {tax.status == 2 && ( // Kiểm tra nếu trạng thái là 2
              <li>
                <strong>
                  Trạng thái: Đã giải thể
                </strong>
              </li>
            )}
          </Link>
        </div>
      ))}
    </>
  );
}

export default TaxesList;
