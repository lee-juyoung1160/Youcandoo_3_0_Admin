<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ucd extends MY_Controller {

    public function index()
    {
        $this->load->template('v2/ucd/ucd-system-wallet');
    }

    public function doit()
    {
        $this->load->template('v2/ucd/ucd-doit-wallet');
    }

    public function user()
    {
        $this->load->template('v2/ucd/ucd-member-wallet');
    }

    public function waiting()
    {
        $this->load->template('v2/ucd/ucd-pending-wallet');
    }

    public function charge()
    {
        $this->load->template('v2/ucd/ucd-charge-list');
    }

    public function create()
    {
        $this->load->template('v2/ucd/ucd-charge-create');
    }

}


