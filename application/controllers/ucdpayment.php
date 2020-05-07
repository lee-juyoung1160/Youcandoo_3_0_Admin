<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ucdpayment extends CI_Controller {

    public function lists()
        {
            $this->load->layout('ucd-payment/ucd-payment-list');
        }

}