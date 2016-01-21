SELECT pixel_id as value,
       pixel_name as label
FROM ((SELECT DISTINCT pixel_id,
              pixel_id || ' - ' || pixel_name AS pixel_name
       FROM conversion_pixel
       WHERE advertiser_id = {{advertiser_id}})
       UNION ALL
       (SELECT 0,
              '0 - No Pixel'))
ORDER BY pixel_id