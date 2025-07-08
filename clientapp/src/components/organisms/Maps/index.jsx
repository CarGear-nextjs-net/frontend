'use client';

import { cn } from '@/lib/utils';
import React from 'react';


const Maps = ({
  className,
  address = 'Số  14 Pháo Đài Láng, Đống Đa, Ha Noi, Viet Nam',
  latitude = 35.6762,
  longitude = 139.6503,
  zoom = 13,
  height = '300px',
  width = '100%',
}) => {
  // Sử dụng Google Maps Embed API
  // const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
  //   address
  // )}&center=${latitude},${longitude}&zoom=${zoom}`;

  // Fallback sử dụng iframe với Google Maps
  const fallbackUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={cn('map-container', className)}>
      <iframe
        src={fallbackUrl}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
        className="rounded-lg shadow-sm"
      />
    </div>
  );
};

export default Maps; 