import { Badge } from 'flowbite-react';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Rating } from 'react-simple-star-rating';
import { userRole } from '../utils/userRole';

function Card({ data, onClick }) {
  const role = userRole();
  const {
    title,
    description,
    date,
    type,
    experience,
    salary,
    address,
    companyName,
    hasApplied,
    rating,
  } = data;
  return (
    <div
      className='shadow-lg p-6 w-full flex flex-col gap-4 cursor-pointer h-[100%] rounded-xl'
      onClick={onClick}
    >
      {hasApplied && (
        <Badge color='purple' className='w-fit p-2'>
          Applied
        </Badge>
      )}
      <div className='flex justify-between'>
        <div>
          <p className='font-bold'>Title</p>
          <p className='font-inter'>{title}</p>
        </div>

        <div>
          <p className='font-bold'>Type</p>
          <p className='font-inter'>{type}</p>
        </div>
      </div>

      <div>
        <p className='font-bold'>Description</p>
        <p className='font-inter'>
          {description.slice(0, 100)}
          {description.length > 100 && '.....'}
        </p>
      </div>

      <div>
        <p className='font-bold'>Address</p>
        <p className='font-inter'>{address}</p>
      </div>

      <div className='flex justify-between items-center'>
        <div>
          <p className='font-bold'>Company Name</p>
          <p className='font-inter'>{companyName}</p>
        </div>

        {role === 'Student' && (
          <div>
            <p className='font-bold'>Rating</p>
            <p className='font-inter'>
              <Rating
                initialValue={rating}
                SVGstyle={{ display: 'inline', width: '15px' }}
                readonly={true}
              />
            </p>
          </div>
        )}
      </div>

      <div className='flex justify-between'>
        <div>
          <p className='font-bold'>Experience</p>
          <p className='font-inter'>
            {experience} {experience > 1 ? 'years' : 'year'}{' '}
          </p>
        </div>

        <div>
          <p className='font-bold'>Salary</p>
          <p className='font-inter'>{salary}</p>
        </div>

        <div>
          <p className='font-bold'>Expiry date</p>
          {date}
        </div>
      </div>
    </div>
  );
}

export default Card;
